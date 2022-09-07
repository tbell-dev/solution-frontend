<template>
  <div id="project-wrap">
    <div class="left-wrap"><MainMenu /></div>
    <div class="right-wrap">
      <Header />
      <main id="main">
        <section>
          <article>
            <ul class="search-filter">
              <li class="search-title">
                <h2>검색일</h2>
              </li>
              <li class="search-contents">
                <input type="date" />
                <label>
                  7일 <input type="radio" v-model="period" value="7일" />
                </label>
                <label>
                  14일 <input type="radio" v-model="period" value="14일" />
                </label>
                <label>
                  1개월 <input type="radio" v-model="period" value="1개월" />
                </label>
                <label>
                  3개월 <input type="radio" v-model="period" value="3개월" />
                </label>
                <label>
                  6개월 <input type="radio" v-model="period" value="6개월" />
                </label>
                <p v-if="period !== ''">현재 선택 : {{ period }}</p>
              </li>
            </ul>
          </article>
        </section>
        <section>
          <ProjectDetail :project-id="projectId" />
          <article>
            <ul class="current-bar">
              <li>
                <h2>검수 작업자 현황</h2>
              </li>
            </ul>
          </article>
          <article>
            <table class="table3">
              <tr class="table3-head">
                <th><span>No</span></th>
                <th><span>구분</span></th>
                <th><span>작업자명</span></th>
                <th><span>완료 작업 건수</span></th>
                <th><span>마지막 작업일</span></th>
                <th><span>작업당 평균 소요시간</span></th>
                <th><span>전체 소요시간</span></th>
              </tr>
              <tr
                v-for="member in projectMember"
                :key="member.id"
                class="card mt-2"
              >
                <td>
                  <span>{{ member.id }}</span>
                </td>
                <td>
                  <span>{{ member.type }}</span>
                </td>
                <td>
                  <span>{{ member.name }}</span>
                </td>
                <td>
                  <span>{{ member.completed }}</span>
                </td>
                <td>
                  <span>{{ member.lastSession }}</span>
                </td>
                <td>
                  <span>{{ member.workTime / member.completed }}</span>
                </td>
                <td>
                  <span>{{ member.workTime }}</span>
                </td>
              </tr>
            </table>
          </article>
          <nav
            v-if="numberOfPages !== 0"
            aria-label="Page navigation example"
            class="pagination"
          >
            <button
              v-if="currentPage !== 1"
              class="page-prev"
              @click="getMember(projectId, currentPage - 1)"
            >
              <img
                src="../../../assets/images/project/icon/icon-page-prev.svg"
                alt=""
              />
            </button>
            <ul class="pagination-page">
              <li
                class="now-page"
                v-for="page in numberOfPages"
                :key="page"
                :class="currentPage === page ? 'active' : ''"
              >
                <a class="page-link" @click="getMember(projectId, page)">{{
                  page
                }}</a>
              </li>
            </ul>
            <button
              v-if="currentPage !== numberOfPages"
              class="page-prev"
              @click="getMember(projectId, currentPage + 1)"
            >
              <img
                src="../../../assets/images/project/icon/icon-page-next.svg"
                alt=""
              />
            </button>
          </nav>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
// 메뉴
import MainMenu from '../../../components/solution/common/MenuMain.vue';
// 헤더
import Header from '../../../components/solution/common/Header.vue';
// 프로젝트 세부 현황
import ProjectDetail from '../../../components/solution/dashboard/dashboard_component/DashboardDetailCollect.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const projectId = route.params.id;
    const period = ref('');
    const projectMember = ref({});
    const currentPage = ref(1);
    const numberOfMembers = ref(0);
    const pageLimit = 5;
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfMembers.value / pageLimit);
    });
    //TODO 작업 시간 포맷 변경
    const getMember = async (projectId, page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/projectMember?projectId=${projectId}&_page=${page}&_limit=${pageLimit}`,
        );
        numberOfMembers.value = res.headers['x-total-count'];
        projectMember.value = res.data;
        console.log(projectMember);
      } catch (error) {
        //TODO 에러처리
        console.error(error);
      }
    };
    getMember(projectId);
    return {
      period,
      projectId,
      projectMember,
      currentPage,
      getMember,
      numberOfPages,
    };
  },
  components: { MainMenu, Header, ProjectDetail },
};
</script>

<style scoped>
@import '../../../css/reset.css';
@import '../../../css/common.css';
.active {
  color: blue;
}
</style>
