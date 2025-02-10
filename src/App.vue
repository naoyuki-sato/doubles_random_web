<script setup>
import { ref, computed, onMounted } from 'vue';

const max_court_num = 1;
const court_num = ref(1);

const max_member_num = 8;
const member_num = ref(4);

const selectedGame = ref(null);

const dobles_ordar_data = ref([
  [[1, 2, 3, 4], [1, 3, 2, 4], [1, 4, 2, 3]],
  [[1, 2, 3, 4], [1, 5, 2, 3], [1, 4, 2, 5], [1, 3, 4, 5], [2, 4, 3, 5], [1, 3, 2, 4], [3, 5, 1, 2], [4, 5, 1, 2], [3, 4, 1, 5], [2, 3, 4, 5], [1, 4, 2, 3], [2, 5, 1, 3], [2, 4, 1, 5], [3, 5, 1, 4], [2, 5, 3, 4]],
  [[1, 2, 3, 4], [5, 6, 1, 3], [2, 5, 4, 6], [1, 6, 2, 3], [2, 4, 1, 5], [3, 6, 4, 5], [1, 4, 2, 6], [3, 5, 1, 2], [3, 4, 5, 6], [1, 3, 2, 5], [2, 4, 1, 6], [3, 5, 4, 6], [1, 5, 2, 6], [2, 3, 4, 5], [1, 4, 3, 6]],
  [[1, 2, 3, 4], [5, 6, 1, 7], [2, 3, 5, 7], [1, 4, 2, 6], [3, 7, 4, 6], [2, 5, 1, 3], [4, 5, 6, 7], [1, 6, 2, 7], [3, 5, 2, 4], [1, 5, 3, 6], [4, 7, 1, 2], [3, 5, 4, 6], [2, 7, 3, 6], [1, 4, 5, 7], [2, 6, 4, 5]],
  [[1, 2, 3, 4], [5, 6, 7, 8], [1, 3, 5, 7], [2, 4, 6, 8], [1, 5, 4, 8], [2, 3, 6, 7], [1, 6, 4, 7], [2, 5, 3, 8], [1, 7, 2, 8], [3, 5, 4, 6], [1, 8, 3, 6], [2, 7, 4, 5], [1, 4, 3, 7], [2, 6, 5, 8], [1, 2, 5, 6]]
]);


// 2面 8名
const doubles_data = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[1, 3, 5, 7], [2, 4, 6, 8]],
  [[1, 4, 5, 8], [2, 3, 6, 7]],
  [[1, 5, 2, 6], [3, 7, 4, 8]],
  [[1, 7, 2, 8], [3, 5, 4, 6]],
  [[1, 6, 3, 8], [2, 5, 4, 7]],
  [[1, 8, 2, 7], [3, 6, 4, 5]],
  [[1, 4, 6, 7], [2, 3, 5, 8]],
  [[1, 2, 5, 6], [3, 4, 7, 8]],
  [[1, 5, 3, 7], [2, 6, 4, 8]]
]);

// 1面 4名
const game_data_1_4 = ref([1, 2, 3, 4], [1, 3, 2, 4], [1, 4, 2, 3]);
// 1面 5名
const game_data_1_5 = ref(
  [1, 2, 3, 4], [1, 5, 2, 3], [1, 4, 2, 5], [1, 3, 4, 5], [2, 4, 3, 5], [1, 3, 2, 4], [3, 5, 1, 2], [4, 5, 1, 2], [3, 4, 1, 5], [2, 3, 4, 5], [1, 4, 2, 3], [2, 5, 1, 3], [2, 4, 1, 5], [3, 5, 1, 4], [2, 5, 3, 4]
);

// 2面 8名
const game_data_2_8 = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[1, 3, 5, 7], [2, 4, 6, 8]],
  [[1, 4, 5, 8], [2, 3, 6, 7]],
  [[1, 5, 2, 6], [3, 7, 4, 8]],
  [[1, 7, 2, 8], [3, 5, 4, 6]],
  [[1, 6, 3, 8], [2, 5, 4, 7]],
  [[1, 8, 2, 7], [3, 6, 4, 5]],
  [[1, 4, 6, 7], [2, 3, 5, 8]],
  [[1, 2, 5, 6], [3, 4, 7, 8]],
  [[1, 5, 3, 7], [2, 6, 4, 8]]
]);
// 2面 9名
const game_data_2_9 = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[1, 9, 3, 5], [2, 4, 6, 7]],
  [[1, 8, 4, 5], [2, 9, 3, 6]],
  [[1, 7, 2, 5], [8, 9, 4, 6]],
  [[3, 8, 1, 6], [4, 7, 5, 9]],
  [[2, 8, 3, 7], [6, 9, 1, 4]],
  [[2, 6, 5, 8], [1, 3, 7, 9]],
  [[2, 7, 1, 5], [3, 9, 4, 8]],
  [[2, 3, 4, 9], [5, 7, 6, 8]],
  [[1, 2, 7, 8], [3, 4, 5, 6]]
]);
// 2面 10名
const game_data_2_10 = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[1, 9, 3, 5], [2, 10, 4, 6]],
  [[7, 9, 2, 5], [8, 10, 1, 6]],
  [[3, 7, 1, 10], [4, 8, 2, 9]],
  [[3, 6, 8, 9], [4, 5, 7, 10]],
  [[1, 4, 5, 8], [2, 3, 6, 7]],
  [[3, 9, 4, 10], [1, 7, 2, 8]],
  [[5, 10, 1, 3], [6, 9, 2, 4]],
  [[5, 7, 2, 6], [1, 8, 9, 10]],
  [[3, 8, 4, 7], [5, 9, 6, 10]],
]);
// 2面 11名
const game_data_2_11 = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[9, 10, 1, 5], [2, 11, 3, 6]],
  [[4, 7, 9, 11], [8, 10, 1, 6]],
  [[2, 4, 8, 9], [3, 5, 7, 10]],
  [[1, 11, 3, 8], [2, 6, 7, 9]],
  [[4, 5, 6, 10], [7, 11, 1, 8]],
  [[2, 5, 10, 11], [3, 9, 1, 4]],
  [[6, 8, 4, 11], [2, 7, 3, 10]],
  [[1, 3, 6, 7], [5, 9, 2, 8]],
  [[4, 10, 6, 9], [5, 8, 3, 11]]
]);

// 2面 12名
const game_data_2_12 = ref([
  [[1, 2, 3, 4], [5, 6, 7, 8]],
  [[9, 10, 1, 5], [11, 12, 2, 6]],
  [[3, 7, 9, 11], [4, 8, 10, 12]],
  [[1, 6, 3, 8], [2, 5, 4, 7]],
  [[2, 9, 6, 10], [1, 11, 5, 12]],
  [[3, 9, 7, 12], [4, 10, 8, 11]],
  [[1, 7, 2, 8], [3, 5, 4, 6]],
  [[1, 9, 6, 12], [2, 10, 5, 11]],
  [[3, 10, 7, 11], [4, 9, 8, 12]],
  [[1, 4, 6, 7], [2, 3, 5, 8]]
]);





const tableData = ref(
  [
    {
      id: 1,
      header1: 'セル1',
      header2: 'セル2',
      header3: 'セル3',
      rowspan: 2
    },
    {
      id: 2,
      header4: 'セル4',
      header5: 'セル5'
    },
    {
      id: 3,
      header1: 'セル6',
      header2: 'セル7',
      header3: 'セル8'
    }
  ]
);

const selectedMatch = ref(1);

const displayedGames = computed(() => {
  const games = [];
  // member_num に応じて適切なデータを使用
  const dataIndex = member_num.value - 4; // 0行目からのオフセットを計算
  if (dataIndex >= 0 && dataIndex < dobles_ordar_data.value.length) { // インデックスが範囲内か確認
    const data = dobles_ordar_data.value[dataIndex];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i += court_num.value) {
        games.push({ id: i + 1, gameData: data[i] });
      }
    }
  }
  return games;
});

onMounted(() => {
  if (member_num.value - 4 >= dobles_ordar_data.value.length) {
    member_num.value = dobles_ordar_data.value.length + 3;
  }
  if (member_num.value < 4) {
    member_num.value = 4;
  }
});

</script>



<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <p>1) コート数</p>
        <v-radio-group v-model="court_num" inline>
          <v-radio v-for="n in max_court_num" :key="n" :label="n + 'コート'" :value="n" color="primary"></v-radio>
        </v-radio-group>
        <v-divider class="border-opacity-75"></v-divider>

        <p>2) 参加人数</p>
        <v-radio-group v-model="member_num" inline>
          <v-radio v-for="n in max_member_num - 3" :key="n" :label="n + 3 + '名'" :value="n + 3"
            color="primary"></v-radio>
        </v-radio-group>
        <v-divider class="border-opacity-75"></v-divider>

        <div>3) 試合順</div>
        <v-table class="match-table">
          <thead>
            <tr>
              <th>番号</th>
              <th>ペア1</th>
              <th></th>
              <th>ペア2</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in displayedGames" :key="game.id">
              <td>
                <v-radio-group v-model="selectedGame">
                  <v-radio :label="game.id" :value="game.id"></v-radio>
                </v-radio-group>
              </td>
              <td>{{ game.gameData[0] }}, {{ game.gameData[1] }}</td>
              <td>vs</td>
              <td>{{ game.gameData[2] }}, {{ game.gameData[3] }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>

      <v-table class="match-table">
        <thead>
          <tr>
            <th>試合番号</th>
            <th>ペア1</th>
            <th></th>
            <th>ペア2</th>
          </tr>
        </thead>
        <tbody v-for="n in 5" :key="n">
          <tr>
            <td rowspan="2">
              <v-radio-group v-model="selectedMatch" :value="n">
                <v-radio :value="n" :label="n"></v-radio>
              </v-radio-group>
            </td>
            <td>{{ doubles_data[n - 1][0][0] }}, {{ doubles_data[n - 1][0][1] }}</td>
            <td>vs</td>
            <td>{{ doubles_data[n - 1][0][2] }}, {{ doubles_data[n - 1][0][3] }}</td>
          </tr>
          <tr>
            <td>{{ doubles_data[n - 1][1][0] }}, {{ doubles_data[n - 1][1][1] }}</td>
            <td>vs</td>
            <td>{{ doubles_data[n - 1][1][2] }}, {{ doubles_data[n - 1][1][3] }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-main>
  </v-app>
</template>

<style scoped>
.match-table>>>.v-radio>.v-label,
.match-table>>>tbody>tr>td {
  font-size: 20px;
}
</style>