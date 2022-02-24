import { useState } from "react";
import "./DiagramBuilder.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GridOnIcon from "@material-ui/icons/GridOn";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TextFieldsIcon from "@material-ui/icons/TextFields";

function DiagramBuilder() {
  const [gridVisible, setGridVisible] = useState(true);

  function toggleGrid() {
    setGridVisible(!gridVisible);
  }

  return (
    <div className="diagram-builder-container">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <div className="label-menu-container">
            <IconButton edge="start" className="title" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>{" "}
            <Typography variant="h5">Diagram Builder</Typography>
          </div>
          <div className="app-bar-buttons-container">
            <div className="grid-button">
              <IconButton edge="start" color="inherit" aria-label="Toggle Grid" onClick={toggleGrid}>
                <GridOnIcon />
              </IconButton>
            </div>
            <div className="add-box-button">
              <IconButton edge="start" color="inherit" aria-label="Add Box">
                <AddBoxIcon />
              </IconButton>
            </div>
            <div className="add-circle-button">
              <IconButton edge="start" color="inherit" aria-label="Add Circle">
                <AddCircleIcon />
              </IconButton>
            </div>
            <div className="add-arrow-button">
              <IconButton edge="start" color="inherit" aria-label="Add Arrow">
                <ArrowRightAltIcon />
              </IconButton>
            </div>
            <div className="add-text-button">
              <IconButton edge="start" color="inherit" aria-label="Add Text Field">
                <TextFieldsIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <div className="diagram-container"></div>
    </div>
  );
}

export default DiagramBuilder;
