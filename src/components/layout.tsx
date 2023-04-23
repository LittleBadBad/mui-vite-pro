import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  CSSObject,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import grey from "@mui/material/colors/grey";
import Tree, { IMenu, Menu, RenderTree } from "@/components/tree";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "unset",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "unset",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const linkList: IMenu[] = [
  {
    href: "/welcome",
    label: "主页",
  },
  {
    href: "/admin",
    label: "管理员",
    submenu: [
      {
        href: "/admin/sub-page",
        label: "二级菜单",
        submenu: [
          {
            href: "/admin/sub-page",
            label: "三级菜单",
          },
        ],
      },
    ],
  },
  {
    href: "/list",
    label: "列表渲染",
    submenu: [
      {
        href: "/admin/sub-page",
        label: "二级菜单",
        submenu: [
          {
            href: "/admin/sub-page",
            label: "三级菜单",
          },
        ],
      },
    ],
  },
];
const icon =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
const siteTitle = "Ant Design Pro";

function convertLinks(links: MenuLink[]): RenderTree<MenuLink>[] {
  return links.map((l, i) => ({
    id: l?.path || i.toString(),
    path: l?.path,
    title: l.title,
    children: l.children?.length ? convertLinks(l.children) : undefined,
  }));
}

const data: RenderTree[] = [
  {
    id: "root",
    name: "Parent",
    children: [
      {
        id: "1",
        name: "Child - 1",
      },
      {
        id: "3",
        name: "Child - 3",
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
      },
    ],
  },
  {
    id: "root1",
    name: "Parent",
    children: [
      {
        id: "1",
        name: "Child - 1",
      },
      {
        id: "3",
        name: "Child - 3",
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
      },
    ],
  },
];

export type MenuLink = {
  path?: string;
  title: string;
  children?: MenuLink[];
  icon?: JSX.Element;
};

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => setOpen((p) => !p);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <img width="auto" height="22" src={icon} alt="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={"permanent"}
        open={open}
        sx={{
          whiteSpace: "nowrap",
          ...(open ? openedMixin(theme) : closedMixin(theme)),
          "& .MuiDrawer-paper": open ? openedMixin(theme) : closedMixin(theme),
        }}
      >
        <Toolbar />
        <IconButton
          sx={{
            width: 24,
            height: 24,
            boxShadow: theme.shadows[1],
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.25)",
            "&:hover": {
              backgroundColor: "white",
              color: "rgba(0, 0, 0, 0.65)",
            },
            position: "absolute",
            right: -12,
            top: 80,
            zIndex: 1,
          }}
          onClick={handleDrawerClose}
        >
          {!open ? (
            <ChevronRightIcon fontSize={"small"} />
          ) : (
            <ChevronLeftIcon fontSize={"small"} />
          )}
        </IconButton>
        <Box sx={{ padding: "0 12px", overflowX: "hidden", height: "100%" }}>
          <Menu
            menus={linkList}
            sx={{ flexDirection: "column" }}
            mode={(open && "expand") || "popover"}
          />
          {/* <Tree<MenuLink>
                    nodes={convertLinks(linkList)}
                    renderNode={(n, depth) =>
                        <ListItemButton sx={{
                            width: 1,
                            mt: 1,
                            p: 1
                        }}>
                            {!depth && ((n.icon && n.icon) || <SentimentSatisfiedIcon/>) ||
                                <SentimentSatisfiedIcon sx={{visibility: 'hidden'}}/>}
                            <ListItemText primary={n.title} sx={{opacity: open ? 1 : 0, ml: 1}}/>
                        </ListItemButton>
                    }
                    sx={{overflow: 'hidden'}}/> */}
        </Box>
      </Drawer>
      <Outlet />
    </Box>
  );
}
