<template>
  <div>
    <article>
      <ul class="current-bar">
        <li>
          <h2>프로젝트 세부 현황</h2>
          <p>22/01/10 13:45 기준</p>
        </li>
        <li class="bar"></li>
        <li>
          <button class="btn2-2"><span>보고서 다운로드</span></button>
        </li>
      </ul>
    </article>
    <article>
      <table class="table3">
        <tr class="table3-head">
          <th><span>프로젝트 명</span></th>
          <th><span>수집건수</span></th>
          <th><span>남은 건수</span></th>
          <th><span>수집 대상</span></th>
          <th><span>수집 기간</span></th>
          <th><span>수집 진행률</span></th>
          <th><span>등록일</span></th>
          <th><span>현재용량</span></th>
        </tr>
        <tr>
          <td>
            <span>{{ projectDetail.projectName }}</span>
          </td>
          <td>
            <span>{{ projectDetail.collectedItem }}</span>
          </td>
          <td>
            <span>{{ projectDetail.remainedItem }}</span>
          </td>
          <td>
            <span>{{ projectDetail.target }}</span>
          </td>
          <td>
            <span
              >{{ projectDetail.startDate }} ~ {{ projectDetail.endDate }}</span
            >
          </td>
          <td>
            <span>{{ projectDetail.progress }}</span>
          </td>
          <td>
            <span>{{ projectDetail.registerDate }}</span>
          </td>
          <td>
            <span>{{ projectDetail.size }}</span>
          </td>
        </tr>
      </table>
    </article>
    <article>
      <ul class="dashboard-detail-chart">
        <li>
          <h2>수집 건수/남은 건수</h2>
          <!-- 그래프 -->
        </li>
        <li>
          <h2>수집 일자 대비 용량</h2>
          <!-- 그래프 -->
        </li>
        <li>
          <h2>수집 건수/검수 건수</h2>
          <!-- 그래프 -->
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: {
    projectId: {},
  },
  setup(props) {
    const projectDetail = ref({});
    const getProjectDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/dashboardDetailCollect/${props.projectId}`,
        );

        projectDetail.value = res.data;
      } catch (error) {
        //TODO: error 메시지
      }
    };
    getProjectDetail();
    return {
      getProjectDetail,
      projectDetail,
    };
  },
};
</script>

<style></style>
