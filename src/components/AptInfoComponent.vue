<template>
  <div>
    <v-card color="#FFFFFF" elevation="6">
      <div>
        <div class="side_panel_title text--secondary">단지정보</div>
        <v-divider></v-divider>
        <v-simple-table height="17rem">
          <template v-slot:default>
            <tbody>
              <tr>
                <th class="detail_info_header">준공년도</th>
                <td class="detail_info">{{ houseInfo.buildYear }}년도</td>
              </tr>
              <tr>
                <th class="detail_info_header">경비관리방식</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.codeSec : "-" }}
                </td>
              </tr>

              <tr>
                <th class="detail_info_header">경비관리인원</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptMgrCnt : "-" }}
                  명
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">청소관리방식</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.codeClean : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">청소관리인원</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdClcnt : "-" }}
                  명
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">음식물처리방법</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.codeGarbage : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">승강기대수</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdEcnt : "-" }}
                  대
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">주차대수(지상)</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdPcnt : "-" }}
                  대
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">주차대수(지하)</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdPcntu : "-" }}
                  대
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">CCTV대수</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdCccnt : "-" }}
                  대
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">부대.복리시설</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.welfareFacility : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">버스정류장 거리</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdWtimebus : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">지하철호선</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.subwayLine : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">지하철역</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.subwayStation : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">지하철역 거리</th>
                <td class="detail_info">
                  {{ houseDetailInfo ? houseDetailInfo.kaptdWtimesub : "-" }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">편의시설</th>
                <td class="detail_info">
                  {{
                    houseDetailInfo ? houseDetailInfo.convenientFacility : "-"
                  }}
                </td>
              </tr>
              <tr>
                <th class="detail_info_header">교육시설</th>
                <td class="detail_info">
                  {{
                    houseDetailInfo ? houseDetailInfo.educationFacility : "-"
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    houseDetailInfo: Object,
    houseInfo: Object,
  },
};
</script>

<style scoped>
.detail_info {
  font-size: 0.75rem !important;
}
.detail_info_header {
  width: 7.5rem;
}
</style>
