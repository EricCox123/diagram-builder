import { useEffect, useState } from "react";
import "./DiagramBuilder.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GridOnIcon from "@material-ui/icons/GridOn";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ClearIcon from "@material-ui/icons/Clear";
import { fabric } from "fabric";

function DiagramBuilder() {
  const [gridVisible, setGridVisible] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [gridLines, setGridLines] = useState([]);

  function initCanvas() {
    let myCanvas = new fabric.Canvas("canvas", {
      height: window.innerHeight - 200,
      width: window.innerWidth - 100,
      backgroundColor: "lightgrey",
    });
    setCanvas(myCanvas);
  }

  useEffect(() => {
    initCanvas();
  }, []);

  function drawCanvasLines() {
    let lines = [];
    for (var i = 0; i < window.innerWidth - 100 / 50; i++) {
      let yLine = new fabric.Line([i * 50, 0, i * 50, window.innerHeight - 200], {
        type: "line",
        stroke: "#4F4C4B",
        selectable: false,
      });
      lines.push(yLine);
      canvas.add(yLine);
      let xLine = new fabric.Line([0, i * 50, window.innerWidth - 100, i * 50], {
        type: "line",
        stroke: "#4F4C4B",
        selectable: false,
      });
      lines.push(xLine);
      canvas.add(xLine);
    }
    setGridLines(lines);
  }

  function toggleGrid() {
    setGridVisible(!gridVisible);
    if (gridVisible) {
      var objects = [...gridLines];
      if (objects !== undefined) {
        var len = objects.length;
        var list = [];
        for (var i = 0; i < len; i += 1) {
          var item = objects[i];
          list.push(item);
        }
        len = list.length;
        for (var i = 0; i < len; i += 1) {
          canvas.remove(list[i]);
        }
      }
      setGridLines([]);
      canvas.renderAll();
    } else {
      drawCanvasLines();
    }
  }

  const [myObjects, setObjects] = useState([]);

  function addRectangle() {
    var min = 99;
    var max = 9999999;

    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    var id = new Date().getTime() + random;
    let myRectangle = new fabric.Rect({
      left: 50,
      top: 50,
      width: 50,
      height: 50,
      type: "rectangle",
      fill: "#fab",
      stroke: "",
      originX: "left",
      originY: "top",
      id: id,
      hasControls: true,
      centeredRotation: true,
    });
    canvas.add(myRectangle);
    let tempObjects = [...myObjects];
    tempObjects.push(myRectangle);
    setObjects(tempObjects);
    canvas.renderAll();
  }

  function addCircle() {
    var circle = new fabric.Circle({
      radius: 30,
      fill: "green",
      left: 100,
      top: 100,
    });
    canvas.add(circle);
    let tempObjects = [...myObjects];
    tempObjects.push(circle);
    setObjects(tempObjects);
    canvas.renderAll();
  }

  function addArrow() {
    var triangle = new fabric.Triangle({
      width: 10,
      height: 15,
      fill: "red",
      left: 235,
      top: 65,
      angle: 90,
    });

    var line = new fabric.Line([50, 100, 200, 100], {
      left: 75,
      top: 70,
      stroke: "red",
    });

    var objs = [line, triangle];

    var alltogetherObj = new fabric.Group(objs);
    canvas.add(alltogetherObj);
    canvas.renderAll();

    let tempObjects = [...myObjects];
    tempObjects.push(alltogetherObj);
    setObjects(tempObjects);
  }

  function addTextBox() {
    var t1 = new fabric.Textbox("MyText", {
      width: 150,
      top: 5,
      left: 5,
      fontSize: 16,
      textAlign: "center",
      fixedWidth: 150,
    });

    canvas.on("text:changed", function (opt) {
      var t1 = opt.target;
      if (t1.width > t1.fixedWidth) {
        t1.fontSize *= t1.fixedWidth / (t1.width + 1);
        t1.width = t1.fixedWidth;
      }
    });

    let tempObjects = [...myObjects];
    tempObjects.push(t1);
    setObjects(tempObjects);
    canvas.add(t1);
  }

  function deleteAllObjects() {
    var objects = [...myObjects];
    if (objects !== undefined) {
      var len = objects.length;
      var list = [];
      for (var i = 0; i < len; i += 1) {
        var item = objects[i];
        list.push(item);
      }
      len = list.length;
      for (var i = 0; i < len; i += 1) {
        canvas.remove(list[i]);
      }
    }
    setObjects([]);
    canvas.renderAll();
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
              <IconButton edge="start" color="inherit" aria-label="Add Box" onClick={addRectangle}>
                <AddBoxIcon />
              </IconButton>
            </div>
            <div className="add-circle-button">
              <IconButton edge="start" color="inherit" aria-label="Add Circle" onClick={addCircle}>
                <AddCircleIcon />
              </IconButton>
            </div>
            <div className="add-arrow-button">
              <IconButton edge="start" color="inherit" aria-label="Add Arrow" onClick={addArrow}>
                <ArrowRightAltIcon />
              </IconButton>
            </div>
            <div className="add-text-button">
              <IconButton edge="start" color="inherit" aria-label="Add Text Field" onClick={addTextBox}>
                <TextFieldsIcon />
              </IconButton>
            </div>
            <div className="clear-button">
              <IconButton edge="start" color="inherit" aria-label="Clear Canvas" onClick={deleteAllObjects}>
                <ClearIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <div className="diagram-container" id="diagram-container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default DiagramBuilder;
