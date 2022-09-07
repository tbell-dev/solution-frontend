<template>
  <main id="main">
    <NewComponent @loadProjects="loadProjects" />
    <section>
      <article>
        <ul class="current-bar1">
          <li>
            <h2>전체 프로젝트</h2>
            <b>{{ projects.length }}</b>
            <h2>건</h2>
          </li>
          <li>
            <select v-model="pageSizeSelect" @click="pageSizeSetting()">
              <option value="10">10개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="50">50개씩 보기</option>
            </select>
          </li>
        </ul>
      </article>
      <article class="basic-article">
        <table class="table1">
          <tr class="table1-head">
            <th><span>No</span></th>
            <th><span>프로젝트 유형</span></th>
            <th><span>프로젝트 명</span></th>
            <th><span>작업자 수</span></th>
            <th><span>프로젝트 생성일</span></th>
            <th class="table1-more"></th>
          </tr>
          <projectItem
            v-for="project in AllProjectListItemPage"
            :key="project"
            :page-size-select="pageSizeSelect"
            :page-num="pageNum"
            :project="project"
          />
        </table>
        <div class="btn-wrap1">
          <router-link
            to="/allproject/allprojectcreate"
            class="btn-set btn2-3 add-project"
            ><span>프로젝트 추가</span
            ><img
              src="../../../../assets/images/project/icon/icon-add.svg"
              alt=""
          /></router-link>
        </div>
      </article>
      <article class="pagination">
        <button class="page-prev" :disabled="pageNum === 0" @click="prevPage">
          <img
            src="../../../../assets/images/project/icon/icon-page-prev.svg"
            alt=""
          />
        </button>
        <ul class="pagination-page">
          <li
            v-for="n in pageCount"
            :key="n"
            :class="{ 'now-page': n === pageNum + 1 }"
            @click="changeCurrentPage(n)"
          >
            <button>
              <span> {{ n }}</span>
            </button>
          </li>
        </ul>
        <button
          class="page-next"
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
        >
          <img
            src="../../../../assets/images/project/icon/icon-page-next.svg"
            alt=""
          />
        </button>
      </article>
    </section>
  </main>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css';
import NewComponent from '@/components/solution/project/project_all/NewComponent';
import { mapState } from 'vuex';
import ProjectItem from '@/components/solution/project/project_all/ProjectItem';

export default {
  computed: {
    ...mapState('allProject', ['projects']),
    maxPage() {
      // 총 페이지 수(and 최대 페이지 번호)
      return Math.ceil(this.countOfTotal / this.listSize);
    },
    startPage() {
      // 페이지 시작 번호
      return (
        Math.trunc((this.currentPage - 1) / this.pageCount) * this.pageCount + 1
      );
    },
    endPage() {
      // 페이지 끝 번호
      let end = this.startPage + this.pageCount - 1;
      return end < this.maxPage ? end : this.maxPage;
    },
    pageCount() {
      //this.pageSize = this.pageSizeSelect;
      let listLeng = this.projects.length,
        listSize = this.pageSizeSelect,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    AllProjectListItemPage() {
      const start = this.pageNum * this.pageSizeSelect,
        end = start + this.pageSizeSelect;
      return this.projects.slice(start, end);
    },
  },
  components: { ProjectItem, NewComponent },
  data: function () {
    return {
      pageNum: 0,
      update: false,
      pageSizeSelect: 10,
      AllProjectListItem: [],
      AllProjectListItemOrigin: [],
    };
  },
  props: {
    listArray: {
      type: Array,
      required: true,
    },

    projectName: {
      type: String,
      default: '',
    },
  },
  methods: {
    loadProjects(searchKeyword) {
      this.$store.dispatch('allProject/searchProject', {
        projectName: searchKeyword,
      });
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    changeCurrentPage(page) {
      this.pageNum = page - 1;
    },
  },
  mounted() {
    this.loadProjects('');
  },
};
</script>
