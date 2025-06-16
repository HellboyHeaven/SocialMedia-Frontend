import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "app/providers/ThemeProvider";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionMenu({ onEdit, onDelete }: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { colors } = useTheme();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} style={{ color: colors.tint }}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.background,
            color: colors.text,
            borderRadius: "8px",
            minWidth: 150,
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: colors.secondary,
            },
          },
          "& .MuiListItemIcon-root": {
            color: colors.text,
          },
        }}
      >
        {onEdit != undefined && (
          <MenuItem
            onClick={() => {
              handleClose();
              onEdit?.();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem
            onClick={() => {
              handleClose();
              onDelete?.();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
