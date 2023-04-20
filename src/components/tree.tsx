import {List, ListItem, ListProps, Typography} from "@mui/material";

export type RenderTree<T extends Record<string, any> = { name: string }> = {
    id: string;
    children?: readonly RenderTree<T>[];
} & Omit<T, "id" | "children">

export type TreeProps<T extends Record<string, any>> = {
    nodes: RenderTree<T> [],
    renderNode?(node: RenderTree<T>, depth: number): JSX.Element,
    depth?: number
} & ListProps

const Tree = <T extends Record<string, any> = { name: string }>
({
     nodes,
     renderNode = (n) => <Typography
         width={'100%'}>{n.name}</Typography>,
     depth = 0,
     ...listProps
 }: TreeProps<T>) => (
    <List {...listProps} sx={Object.assign({textAlign: "left", width: 1, p: 0}, listProps.sx)}>
        {nodes.map(node => <ListItem key={node.id} sx={{display: 'flex', flexDirection: "column", p: 0}}>
            {renderNode(node, depth)}
            {Array.isArray(node.children)
                ? <Tree nodes={node.children} renderNode={renderNode} {...listProps} depth={depth + 1}/>
                : null}
        </ListItem>)}
    </List>
);

export default Tree