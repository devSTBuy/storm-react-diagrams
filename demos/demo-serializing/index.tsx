import { DiagramEngine, DiagramModel, DefaultNodeModel, LinkModel, DiagramWidget } from "storm-react-diagrams";
import * as React from "react";
import { DemoWorkspaceWidget } from "../.helpers/DemoWorkspaceWidget";
import { action } from "@storybook/addon-actions";
import * as beautify from "json-beautify";

export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
	var port1 = node1.addOutPort("Out");
	node1.setPosition(100, 100);

	//3-B) create another default node
	var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
	var port2 = node2.addInPort("In");
	node2.setPosition(400, 100);

	//3-C) link the 2 nodes together
	var link1 = port1.link(port2);

	//4) add the models to the root graph
	model.addAll(node1, node2, link1);

	//5) load model into engine
	engine.setDiagramModel(model);

	//!------------- SERIALIZING ------------------

	var str = JSON.stringify(model.serializeDiagram());

	//!------------- DESERIALIZING ----------------

	var model2 = new DiagramModel();
	model2.deSerializeDiagram(JSON.parse(str), engine);
	engine.setDiagramModel(model2);

	return (
		<DemoWorkspaceWidget
			buttons={
				<button
					onClick={() => {
						action("Serialized Graph")(beautify.default(model2.serializeDiagram(), null, 2, 80));
					}}
				>
					Serialize Graph
				</button>
			}
		>
			<DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
		</DemoWorkspaceWidget>
	);
};
