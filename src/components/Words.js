import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import { AnimatePresence } from "framer-motion";
import Detail from "./Detail";

////////////////////////////////////////////////////////////////////////////
/////// class App is the parent component of Link and Node
////////////////////////////////////////////////////////////////////////////

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLinkArray: [],
      name: "",
      nodes: [
        { name: "키워드21", id: 21 },
        { name: "키워드22", id: 22 },
        { name: "키워드23", id: 23 },
        { name: "키워드24", id: 24 },
        { name: "키워드25", id: 25 },
        { name: "키워드26", id: 26 },
        { name: "키워드27", id: 27 },
        { name: "키워드28", id: 28 },
        { name: "키워드29", id: 29 },
        { name: "키워드30", id: 30 },
        { name: "키워드10", id: 10 },
        { name: "키워드11", id: 11 },
        { name: "키워드12", id: 12 },
        { name: "키워드13", id: 13 },
        { name: "키워드14", id: 14 },
        { name: "키워드15", id: 15 },
        { name: "키워드16", id: 16 },
        { name: "키워드17", id: 17 },
        { name: "키워드18", id: 18 },
        { name: "키워드19", id: 19 },
        { name: "키워드20", id: 20 },
        { name: "키워드00", id: 0 },
        { name: "키워드01", id: 1 },
        { name: "키워드02", id: 2 },
        { name: "키워드03", id: 3 },
        { name: "키워드04", id: 4 },
        { name: "키워드05", id: 5 },
        { name: "키워드06", id: 6 },
        { name: "키워드07", id: 7 },
        { name: "키워드08", id: 8 },
        { name: "키워드09", id: 9 },
      ],
      links: [
        // { source: 0, target: 1, id: 0 },
        // { source: 0, target: 2, id: 1 },
        // { source: 0, target: 3, id: 2 },
      ],
      selectedNode: null,
      isShowing: false,
    };
    this.handleAddNode = this.handleAddNode.bind(this);
    this.addNode = this.addNode.bind(this);
  }

  componentDidMount() {
    const data = this.state;
    FORCE.initForce(data.nodes, data.links);
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
    const fs = 20 + 2 * this.props.data.id;
    this.d3Node = d3
      .select(this.gRef.current)
      .datum(this.props.data)
      .call(FORCE.enterNode)
      .style("font-weight", "400")
      .style("font-size", `${fs}px`);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data).call(FORCE.updateNode);
  }

  render() {
    const { id, name } = this.props.data;
    return (
      <g className="node" ref={this.gRef}>
        <text onClick={() => this.props.onNodeClicked({ id, name })}>{name}</text>
      </g>
    );
  }
}

///////////////////////////////////////////////////////////
/////// Functions and variables
///////////////////////////////////////////////////////////

var FORCE = (function (nsp) {
  var width = window.innerWidth - 200,
    height = window.innerHeight - 120,
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
        .select("text")
        .style("fill", "black")
        .style("text-transform", "uppercase")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-family", "Gowun Dodum")
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
      selection.attr("stroke-width", 2).attr("stroke", "black");
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

export default Words;
