
import { TableCell, TableHead, TableRow } from "@mui/material";

type Props = {
    HeadTableArray: string[];
}

const Tablehead = (props: Props) => {
    const { HeadTableArray } = props;
    return (
        <TableHead>
            <TableRow>
                {HeadTableArray.map((head) => (
                    <TableCell key={head} sx={{
                        fontWeight: "900",
                    }}>{head}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
export default Tablehead;