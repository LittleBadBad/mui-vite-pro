import { Box, List, ListItem, ListProps, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import TreeView from "@mui/lab/TreeView";
import { Button, Divider, ListItemButton, Popover } from "@mui/material";
import React, {
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { TreeItem } from "@mui/lab";

export type RenderTree<T extends Record<string, any> = { name: string }> = {
  id: string;
  children?: readonly RenderTree<T>[];
} & Omit<T, "id" | "children">;

export type TreeProps<T extends Record<string, any>> = {
  nodes: RenderTree<T>[];
  renderNode?(node: RenderTree<T>, depth: number): JSX.Element;
  depth?: number;
} & ListProps;

const Tree = <T extends Record<string, any> = { name: string }>({
  nodes,
  renderNode = (n) => <Typography width={"100%"}>{n.name}</Typography>,
  depth = 0,
  ...listProps
}: TreeProps<T>) => {
  const [open, setOpen] = useState([]);
  return (
    <List
      {...listProps}
      sx={Object.assign({ textAlign: "left", width: 1, p: 0 }, listProps.sx)}
    >
      {nodes.map((node) => (
        <ListItem
          key={node.id}
          sx={{ display: "flex", flexDirection: "column", p: 0 }}
        >
          {renderNode(node, depth)}
          {Array.isArray(node.children) ? (
            <Tree
              nodes={node.children}
              renderNode={renderNode}
              {...listProps}
              depth={depth + 1}
            />
          ) : null}
        </ListItem>
      ))}
    </List>
  );
};

export interface IMenu {
  click?: MouseEventHandler;
  href?: string;
  type?: "normal" | "separator" | "submenu" | "checkbox" | "radio";
  label?: string;
  sublabel?: string;
  toolTip?: string;
  icon?: ReactNode;
  enabled?: boolean;
  visible?: boolean;
  submenu?: IMenu[];
}

function Submenu({ menu, depth = 1 }: { menu: IMenu; depth?: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { mode } = useContext(MenuContext);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ListItemButton
        ref={ref}
        onClick={(event) => {
          menu.click?.(event);
          setOpen(true);
        }}
        onMouseEnter={(event) => {
          setOpen(true);
        }}
      >
        {menu.label}
        <ArrowRightIcon />
      </ListItemButton>
      {mode === "popover" && open && (
        <Popover
          open={open}
          anchorEl={ref.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List>
            {menu.submenu?.map((v, i) =>
              v.type === "separator" ? (
                <Divider key={v.label + "-" + i} />
              ) : v.submenu ? (
                <Submenu menu={v} key={v.label + "-" + i} depth={depth + 1} />
              ) : (
                <ListItemButton key={v.label} onClick={v.click || handleClose}>
                  {v.label}
                </ListItemButton>
              )
            ) || false}
          </List>
        </Popover>
      )}
      {mode === "expand" && open && (
        <List>
          {menu.submenu?.map((v, i) =>
            v.type === "separator" ? (
              <Divider key={v.label + "-" + i} />
            ) : v.submenu ? (
              <Submenu menu={v} key={v.label + "-" + i} depth={depth + 1} />
            ) : (
              <ListItemButton key={v.label} onClick={v.click || handleClose}>
                {v.label}
              </ListItemButton>
            )
          ) || false}
        </List>
      )}
    </>
  );
}

export function MenuButton({
  menu,
  open,
  onClick,
  onClose,
  onMouseEnter,
}: {
  menu: IMenu;
  open: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onClose(): void;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { mode } = useContext(MenuContext);
  const ref = useRef(null);

  return (
    <>
      <ListItemButton ref={ref} onClick={onClick} onMouseEnter={onMouseEnter}>
        {menu.label}
      </ListItemButton>
      {mode === "popover" && open && menu.submenu && (
        <Popover
          open={open}
          marginThreshold={0}
          anchorEl={ref.current}
          onClose={onClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List>
            {menu.submenu.map((v, i) =>
              v.type === "separator" ? (
                <Divider key={v.label + "-" + i} sx={{ my: 0.5 }} />
              ) : v.submenu ? (
                <Submenu menu={v} key={v.label + "-" + i} />
              ) : (
                <ListItemButton
                  key={v.label + "-" + i}
                  onClick={(e) => {
                    v.click?.(e);
                    onClose();
                  }}
                >
                  {v.label}
                </ListItemButton>
              )
            ) || false}
          </List>
        </Popover>
      )}
      {mode === "expand" && open && menu.submenu && (
        <List>
          {menu.submenu.map((v, i) =>
            v.type === "separator" ? (
              <Divider key={v.label + "-" + i} sx={{ my: 0.5 }} />
            ) : v.submenu ? (
              <Submenu menu={v} key={v.label + "-" + i} />
            ) : (
              <ListItemButton
                key={v.label + "-" + i}
                onClick={(e) => {
                  v.click?.(e);
                  onClose();
                }}
              >
                {v.label}
              </ListItemButton>
            )
          ) || false}
        </List>
      )}
    </>
  );
}

const MenuContext = createContext<{ mode: "expand" | "popover" }>({
  mode: "expand",
});
export function Menu({
  menus,
  mode,
  ...props
}: { menus: IMenu[]; mode: "expand" | "popover" } & ListProps) {
  const [opened, setOpened] = useState<boolean[]>(menus.map((_) => false));

  const openI = (i: number) => {
    switch (mode) {
      case "expand":
        setOpened((p) => p.map((v, i1) => (i === i1 && true) || v));
        break;
      case "popover":
        setOpened((p) => p.map((_, i1) => i === i1));
        break;
    }
  };

  const closeI = (i: number) => {
    switch (mode) {
      case "expand":
        setOpened((p) => p.map((v, i1) => (i === i1 ? false : v)));
        break;
      case "popover":
        setOpened((p) => p.map((_) => false));
        break;
    }
  };
  useEffect(() => {
    setOpened(menus.map((_) => false));
  }, [menus.length]);
  return (
    <MenuContext.Provider value={{ mode }}>
      <List {...props}>
        {menus.map((v, i) => {
          console.log(opened);
          return (
            <MenuButton
              key={v.label + "-" + i}
              menu={v}
              onClick={(e) => {
                v.click && v.click(e);
                opened[i] ? closeI(i) : openI(i);
              }}
              onMouseEnter={() => {
                mode === "popover" && opened.includes(true) && openI(i);
              }}
              open={opened[i]}
              onClose={() => closeI(i)}
            />
          );
        })}
      </List>
    </MenuContext.Provider>
  );
}

const MenuTree = ({ menus }: { menus: IMenu[] }) => {
  return <TreeView></TreeView>;
};

export default Tree;
