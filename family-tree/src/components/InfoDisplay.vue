<script>
export default {
  props: ['selectedNode', 'generalData', 'colors'],
  data() {
    return {
      tab: 'general',
    }
  }
}
</script>

<template>
  <v-card>
    <div class="d-flex flex-row">
      <v-tabs v-model="tab" direction="vertical" color="primary">
        <v-tab value="general"> General</v-tab>
        <v-tab value="node"> Node</v-tab>
        <v-tab value="legend">Legend</v-tab>
        <v-tab value="controls">Controls</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="controls">
          <v-card flat>
            <v-btn>Calculate Relationships</v-btn>
          </v-card>
        </v-window-item>
        <v-window-item value="legend">
          <v-card flat>
            <v-card-title>Legend</v-card-title>
            <v-card-text>
              <p>
              <svg height="8" width="20">
                <line x1="0" y1="4" x2="20" y2="4" :style="`stroke:${colors.linkColors.mother};stroke-width:2`"/>
              </svg>
              : mother
              </p>
              <p>
              <svg height="8" width="20">
                <line x1="0" y1="4" x2="20" y2="4" :style="`stroke:${colors.linkColors.father};stroke-width:2`"/>
              </svg>
              : father
              </p>
              <p>
              <svg height="8" width="20">
                <line x1="0" y1="4" x2="20" y2="4" :style="`stroke:${colors.linkColors.sibling};stroke-width:2`"/>
              </svg>
              : sibling
              </p>
              <p>
              <svg height="8" width="20">
                <line x1="0" y1="4" x2="20" y2="4" :style="`stroke:${colors.linkColors.spouse};stroke-width:2`"/>
              </svg>
              : spouse
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="general">
          <v-card flat>
            <v-card-title>
              {{ generalData?.title || 'General Information' }}
            </v-card-title>
            <v-card-text>
              {{
                generalData?.text || 'No general information has been added for this family tree.'
              }}
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="node">
          <v-card flat>
            <v-card-title>
              {{ selectedNode?.name || 'Selected Node Info' }}
            </v-card-title>
            <v-card-text>
              <div v-if="!selectedNode">
                No node is selected.
              </div>
              <div v-if="selectedNode">
                <p>{{ `Name: ${this.selectedNode.name}` }}</p>
                <p v-if="selectedNode.other_names?.length > 0">
                  {{ `Other Names: ${this.selectedNode.other_names}` }}
                </p>
                <div v-if="selectedNode.birth">
                  <p v-if="selectedNode.birth.date">
                    {{ `Birth Date: ${this.selectedNode.birth.date}` }}
                  </p>
                  <p v-if="selectedNode.birth.location">
                    {{ `Birth Location: ${this.selectedNode.birth.location}` }}
                  </p>
                </div>
                <div v-if="selectedNode.death">
                  <p v-if="selectedNode.death.date">
                    {{ `Death Date: ${this.selectedNode.death.date}` }}
                  </p>
                  <p v-if="selectedNode.death.location">
                    {{ `Death Location: ${this.selectedNode.death.location}` }}
                  </p>
                </div>
                <p v-if="selectedNode.notes">
                    {{ `Notes: ${this.selectedNode.notes}` }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>
