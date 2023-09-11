<script>
import ForceGraph from 'force-graph'
import InfoDisplay from './InfoDisplay.vue'
import NewPersonForm from './NewPersonForm.vue'

export default {
  props: ['rawData'],
  components: {
    InfoDisplay,
    NewPersonForm
  },
  data() {
    return {
      graph: null,
      selectedNode: null,
      gData: {
        nodes: [
          {
            id: 'id1',
            name: 'name1'
          },
          {
            id: 'id2',
            name: 'name2'
          }
        ],
        links: [
          {
            source: 'id1',
            target: 'id2'
          }
        ]
      },
      colors: {
        linkColors: {
          mother: 'blue',
          father: 'red',
          stepParent: 'black',
          sibling: 'green',
          spouse: 'yellow'
        }
      },
      nodeSize: 2,
      collapseSidebar: false,
      showNewPersonForm: false,
    }
  },
  methods: {
    setupTree() {
      const treeElement = document.getElementById('tree');

      this.graph = ForceGraph()(treeElement)
        // .cooldownTicks(100)
        .nodeCanvasObject(this.nodeCanvasObjectFn)
        .nodeCanvasObjectMode(() => 'after')
        .nodeVal(this.nodeSize)
        .linkLabel(this.linkLabelFn)
        .linkDirectionalArrowLength(this.linkDirectionalArrowLengthFn)
        .linkDirectionalArrowRelPos(0.9)
        .onNodeClick(this.onNodeClickFn)
        .graphData(this.gData)
    },
    onNodeClickFn(node) {
      if (node.id === this.selectedNode?.id) {
        this.selectedNode = null
        console.log('clear selected node')
      } else {
        this.selectedNode = node
        console.log('new selected node')
      }
      this.graph.d3ReheatSimulation();
    },
    nodeCanvasObjectFn(node, ctx, globalScale) {
      const label = node.lastName?.charAt(0) || node.name.charAt(0)
      const fontSize = 14 / globalScale
      ctx.font = `${fontSize}px Sans-Serif`

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'black'
      ctx.fillText(label, node.x, node.y)

      if (node.id === this.selectedNode?.id) {
        ctx.strokeStyle = 'yellow'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, this.nodeSize * this.graph.nodeRelSize(), 0, Math.PI * 2)
        ctx.stroke()
      }
    },
    linkLabelFn(link) {
      return `${link.target.name} ${link.type} of ${link.source.name}`
    },
    linkDirectionalArrowLengthFn(link) {
      // only parent links should be directional
      return link.type === 'parent' ? 5 : 0
    },
    processRawData() {
      console.log('processing new raw data')
      const tempNodes = this.rawData.people
      const tempLinks = []
      for (let personId = 0; personId < tempNodes.length; personId++) {
        const { id, relationships } = tempNodes[personId]

        // add parent links
        if (relationships.mother) {
          const otherId = relationships.mother;
          tempLinks.push({
            source: id,
            target: otherId,
            type: 'mother',
            color: this.colors.linkColors.mother
          });
        }
        
        if (relationships.father) {
          const otherId = relationships.father;
          tempLinks.push({
            source: id,
            target: otherId,
            type: 'father',
            color: this.colors.linkColors.father
          });
        }

        for (
          let relationshipId = 0;
          relationshipId < relationships.stepParents?.length;
          relationshipId++
        ) {
          const otherId = relationships.stepParents[relationshipId]
          tempLinks.push({
            source: id,
            target: otherId,
            type: 'step parent',
            color: this.colors.linkColors.stepParent
          })
        }

        // add sibling links
        for (
          let relationshipId = 0;
          relationshipId < relationships.siblings?.length;
          relationshipId++
        ) {
          const otherId = relationships.siblings[relationshipId]
          if (id < otherId) {
            tempLinks.push({
              source: id,
              target: otherId,
              type: 'sibling',
              color: this.colors.linkColors.sibling
            })
          }
        }

        // add spouse links
        for (
          let relationshipId = 0;
          relationshipId < relationships.spouses?.length;
          relationshipId++
        ) {
          const otherId = relationships.spouses[relationshipId]
          if (id < otherId) {
            tempLinks.push({
              source: id,
              target: otherId,
              type: 'spouse',
              color: this.colors.linkColors.spouse
            })
          }
        }

        this.gData = { nodes: tempNodes, links: tempLinks }
        console.log(this.rawData)
        this.graph.graphData(this.gData)
      }
    },
    closeAndClearNewPersonForm() {
      this.showNewPersonForm=false;
      this.$refs.newPersonForm.clearData()
    }
  },
  mounted() {
    this.setupTree()
  },
  watch: {
    rawData() {
      this.processRawData()
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col id="treecol" :cols="(collapseSidebar) ? 11 : 8">
        <div id="tree"></div>
      </v-col>
      <v-col v-if="collapseSidebar" cols="1">
        <v-btn variant="outlined" block @click="collapseSidebar=false">Expand</v-btn>
      </v-col>
      <v-col v-if="!collapseSidebar" cols="4">
        <v-btn variant="outlined" block @click="collapseSidebar=true">Collapse</v-btn>
        <InfoDisplay 
          :generalData="rawData.general || null" 
          :selectedNode="selectedNode" 
          :colors="colors"></InfoDisplay>
          <v-card flat>
            <v-btn @click="showNewPersonForm=true">Calculate Relationships</v-btn>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay 
    v-model="showNewPersonForm"
    class="align-center justify-center"
  >
    <v-card style="border: 15px solid white;" class="overlay-form"> 
      <v-card-title>New Person Form</v-card-title>
      <NewPersonForm 
        ref="newPersonForm" 
        :rawData="rawData"
      ></NewPersonForm>
      <v-card-actions>
        <v-btn
          variant="text"
          @click="closeAndClearNewPersonForm()"
        >
          Close
        </v-btn>
        <v-btn
          variant="text"
          @click="$refs.newPersonForm.submitData(); closeAndClearNewPersonForm();"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<style>
  .overlay-form {
    width: calc(100vw - 200px);
    max-width: 600px;
    height: calc(100vh - 100px);
    overflow-y: scroll !important;
  }
</style>