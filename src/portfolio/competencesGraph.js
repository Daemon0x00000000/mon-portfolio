import cytoscape from 'cytoscape';

export default function drawSkills(element) {
    var cy = cytoscape({
        container: element, // the container to render the graph in

        // disable panning and zooming
        userPanningEnabled: true,
        boxSelectionEnabled: false,
        // Disable scrolling

        autoungrabify: false,


        zoomingEnabled: true,
        minZoom: 0.5,
        maxZoom: 1.5,

        // disable user zooming


        elements: {
            nodes: [
                {data: {id: 'back', label: 'Back'}},
                {data: {id: 'front', label: 'Front'}},
                {data: {id: 'PHP', label: 'PHP',}},
                {data: {id: 'JS', label: 'JS/TS',}},
                {data: {id: 'CSS', label: 'CSS',}},
                {data: {id: 'SASS', label: 'Sass', class: 'children'}},
                {data: {id: 'HTML', label: 'HTML',}},
                {data: {id: 'React', label: 'React', class: 'children'}},
                {data: {id: 'SQL', label: 'SQL',}},
                {data: {id: 'Java', label: 'Java',}},
                {data: {id: 'JS2', label: 'JS/TS',}},
                {data: {id: 'NodeJS', label: 'Node', class: 'children'}},
                {data: {id: 'Symfony', label: 'Symfony', class: 'children'}},
                {data: {id: 'Solidity', label: 'Solidity'}},
                {data: {id: 'Python', label: 'Python'}},
                {data: {id: 'Jquery', label: 'Jquery', class: 'children'}},
            ],
            edges: [
                {data: {source: 'back', target: 'PHP'}},
                {data: {source: 'back', target: 'SQL'}},
                {data: {source: 'back', target: 'Java'}},
                {data: {source: 'back', target: 'JS'}},
                {data: {source: 'front', target: 'CSS'}},
                {data: {source: 'front', target: 'HTML'}},
                {data: {source: 'back', target: 'Solidity'}},
                {data: {source: 'JS', target: 'NodeJS'}},
                {data: {source: 'front', target: 'JS2'}},
                {data: {source: 'JS2', target: 'React'}},
                {data: {source: 'CSS', target: 'SASS'}},
                {data: {source: 'PHP', target: 'Symfony'}},
                {data: {source: 'back', target: 'Python'}},
                {data: {source: 'JS2', target: 'Jquery'}},
            ]
        },

        layout: {
            name: 'cose',
            // Center the tree
            fit: true,
            // Padding on fit
            padding: 30,
            // Whether to enable incremental mode
            randomize: false,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: 40000,

            // Ideal (intra-graph) edge length
            idealEdgeLength: 10,

            // Divisor to compute edge forces
            edgeElasticity: 50,

            // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
            nestingFactor: 5,

            // Gravity force (constant)

            gravity: 20,

            // Maximum number of iterations to perform
            numIter: 1000,

            // Whether to tile disconnected nodes
            tile: true,

            // Type of layout animation. The option set is {'during', 'end', false}
            animate: 'end',

            // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
            tilingPaddingVertical: 10,

            // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
            tilingPaddingHorizontal: 10,

            // Gravity range (constant) for compounds
            gravityRangeCompound: 1.5,

            // Gravity force (constant) for compounds
            gravityCompound: 1.0,

            // Gravity range (constant)
            gravityRange: 3.8,

            // Initial cooling factor for incremental layout
            initialEnergyOnIncremental: 0.5,

            // Whether to use threading to speed up the layout
            useMultitasking: true,


        },

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': 'black',
                    'label': 'data(label)',
                    'text-valign': 'bottom',
                    'text-halign': 'center',
                    'color': 'black',
                    'text-wrap': 'wrap',
                    'text-max-width': '100px',
                    // Margin around the text
                    'text-margin-y': 5,
                    'width': '10px',
                    'height': 'label',
                    'padding': '10px',
                    'shape': 'circle',
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'background-color': 'black',
                    'text-outline-color': 'black',
                    'border-color': 'black',
                    'source-arrow-color': 'black',
                    'target-arrow-color': 'black',
                    'transition-property': 'background-color, line-color, target-arrow-color, source-arrow-color',
                    'transition-duration': '0.5s'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#333',
                    'target-arrow-color': '#333',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'opacity': 0.5
                }
            },
            {
                selector: 'edge:selected',
                style: {
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black',
                    'transition-property': 'background-color, line-\ncolor, target-arrow-color, source-arrow-color',
                    'transition-duration': '0.5s'
                }
            },

            {
                selector: 'node[id = "back"], node[id = "front"]',
                style: {
                    'background-color': '#ff0000',
                    'text-outline-color': '#ff0000',
                    'border-color': '#ff0000',
                    'source-arrow-color': '#ff0000',
                    'target-arrow-color': '#ff0000',
                    'transition-property': 'background-color, line-color, target-arrow-color, source-arrow-color',
                    'transition-duration': '0.5s'
                }
            },
            {
                selector: 'node[class = "children"]',
                style: {
                    // Dark green background
                    'background-color': '#00cc00',
                    // Light green text
                    'text-outline-color': '#00cc00',
                    'border-color': '#00cc00',
                    'source-arrow-color': '#00cc00',
                    'target-arrow-color': '#00cc00',
                    'transition-property': 'background-color, line-color, target-arrow-color, source-arrow-color',
                    'transition-duration': '0.5s'
                }
            },
            // Set python node to a bg image
            {
                selector: 'node[id = "Python"]',
                style: {
                    'background-image': '/home/synth/Documents/icons8-python.svg',
                }
            },

        ]
    });

    cy.fit();
    cy.zoom(2);
    return cy;
}
