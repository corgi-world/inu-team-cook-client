import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import { AnimatePresence } from "framer-motion";
import Detail from "./Detail";

////////////////////////////////////////////////////////////////////////////
/////// class App is the parent component of Link and Node
////////////////////////////////////////////////////////////////////////////

class LinkWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLinkArray: [],
      name: "",
      nodes: this.props.nodes || [],
      links: this.props.links || [],
      selectedNode: null,
      isShowing: false,
    };
    this.handleAddNode = this.handleAddNode.bind(this);
    this.addNode = this.addNode.bind(this);
  }

  componentDidMount() {
    // this.setState((prevState) => {
    //   return { ...prevState, nodes: this.props.nodes };
    // });

    const { nodes, links } = this.state;
    if (nodes.length === 0) return;

    FORCE.initForce(nodes, links);
    FORCE.tick(this);
    FORCE.drag();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
      const data = this.state;
      FORCE.initForce(data.nodes, data.links);
      FORCE.tick(this);
      FORCE.drag();
    }
  }

  handleAddNode(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addNode(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      nodes: [
        ...prevState.nodes,
        { name: this.state.name, id: prevState.nodes.length + 1 },
      ],
      name: "",
    }));
  }

  onNodeClicked = (node) => {
    console.log(FORCE);
    const { id, name } = node;
    this.setState((prevState) => ({
      ...prevState,
      selectedNode: { id, name },
      isShowing: !prevState.isShowing,
    }));
  };
  onDetailClicked = () => {
    this.setState((prevState) => ({
      ...prevState,
      selectedNode: null,
      isShowing: !prevState.isShowing,
    }));

    if (this.state.isShowing) {
      // FORCE.initForce(this.state.nodes, this.state.links);
      FORCE.tick(this);
      FORCE.drag();
    }
  };

  render() {
    var links = this.state.links.map((link) => {
      return <Link key={link.id} data={link} />;
    });
    var nodes = this.state.nodes.map((node) => {
      return (
        <Node
          data={node}
          name={node.name}
          key={node.id}
          onNodeClicked={this.onNodeClicked}
        />
      );
    });
    return (
      <div>
        <svg
          className="graph"
          width={FORCE.width}
          height={FORCE.height}
          style={{ overflow: "visible" }}
        >
          <g>{links}</g>
          <g>{nodes}</g>
        </svg>

        <AnimatePresence>
          {this.state.isShowing ? (
            <Detail
              selectedNode={this.state.selectedNode}
              onDetailClicked={this.onDetailClicked}
            />
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////
/////// Link component
///////////////////////////////////////////////////////////

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.gRef = React.createRef();
  }

  componentDidMount() {
    this.d3Link = d3
      .select(this.gRef.current)
      .datum(this.props.data)
      .call(FORCE.enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data).call(FORCE.updateLink);
  }

  render() {
    return <line className="link" ref={this.gRef} />;
  }
}

///////////////////////////////////////////////////////////
/////// Node component
///////////////////////////////////////////////////////////

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.gRef = React.createRef();
  }
  componentDidMount() {
    const { id, name } = this.props.data;
    const fs = id === 0 ? 50 : 30;
    const fw = id === 0 ? "600" : "200";
    this.d3Node = d3
      .select(this.gRef.current)
      .datum(this.props.data)
      .call(FORCE.enterNode)
      .style("font-weight", fw)
      .style("font-size", `${fs}px`);

    const widthFactor = id === 0 ? 50 : 30;
    const xFactor = widthFactor / 2;
    const height = id === 0 ? 60 : 40;
    const y = id === 0 ? 35 : 22;

    d3.select(this.gRef.current)
      .select("rect")
      .attr("width", name.length * widthFactor)
      .attr("height", height)
      .attr("x", -name.length * xFactor)
      .attr("y", -y)
      .style("fill", "white");
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data).call(FORCE.updateNode);
  }

  render() {
    const { id, name } = this.props.data;
    return (
      <g className="node" ref={this.gRef}>
        <rect />
        <text onClick={() => this.props.onNodeClicked({ id, name })}>{name}</text>
      </g>
    );
  }
}

///////////////////////////////////////////////////////////
/////// Functions and variables
///////////////////////////////////////////////////////////

var FORCE = (function (nsp) {
  var width = 500,
    height = 720,
    color = d3.scaleOrdinal(d3.schemeCategory10),
    initForce = (nodes, links) => {
      nsp.force = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-200))
        .force("link", d3.forceLink(links).distance(150))
        .force(
          "center",
          d3
            .forceCenter()
            .x(nsp.width / 2)
            .y(nsp.height / 2)
        )
        .force("collide", d3.forceCollide([5]).iterations([5]));
    },
    enterNode = (selection) => {
      selection
        .select("rect")
        .attr("width", 2)
        .attr("height", 2)
        .attr("x", -1)
        .attr("y", -1)
        .style("fill", "white");

      selection
        .select("text")
        .style("background-color", "black")
        .style("text-transform", "uppercase")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-family", "Noto Serif KR")
        .style("cursor", "pointer");
    },
    updateNode = (selection) => {
      selection
        .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
        .attr("cx", function (d) {
          return (d.x = Math.max(30, Math.min(width - 30, d.x)));
        })
        .attr("cy", function (d) {
          return (d.y = Math.max(30, Math.min(height - 30, d.y)));
        });
    },
    enterLink = (selection) => {
      selection.attr("stroke-width", 1).attr("stroke", "black");
    },
    updateLink = (selection) => {
      selection
        .attr("x1", (d) => d.source.x + 0)
        .attr("y1", (d) => d.source.y + 0)
        .attr("x2", (d) => d.target.x + 0)
        .attr("y2", (d) => d.target.y + 0);
    },
    updateGraph = (selection) => {
      selection.selectAll(".node").call(updateNode);
      selection.selectAll(".link").call(updateLink);
    },
    dragStarted = (d) => {
      if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragging = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragEnded = (d) => {
      if (!d3.event.active) nsp.force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    drag = () =>
      d3
        .selectAll("g.node")
        .call(
          d3.drag().on("start", dragStarted).on("drag", dragging).on("end", dragEnded)
        ),
    tick = (that) => {
      that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
      nsp.force.on("tick", () => {
        that.d3Graph.call(updateGraph);
      });
    };

  nsp.width = width;
  nsp.height = height;
  nsp.enterNode = enterNode;
  nsp.updateNode = updateNode;
  nsp.enterLink = enterLink;
  nsp.updateLink = updateLink;
  nsp.updateGraph = updateGraph;
  nsp.initForce = initForce;
  nsp.dragStarted = dragStarted;
  nsp.dragging = dragging;
  nsp.dragEnded = dragEnded;
  nsp.drag = drag;
  nsp.tick = tick;

  return nsp;
})(FORCE || {});

export default LinkWords;
