<template>
  <main id="main">
    <section>
      <article class="align1 button-filter">
        <a href="#" class="btn-set btn2-1">가공</a>
        <a href="#" class="btn-set btn1-1">검수</a>
        <a href="#" class="btn-set btn1-1">최종</a>
      </article>
    </section>
    <section>
      <article>
        <ul class="search-filter">
          <li class="search-title">
            <h2>검색어</h2>
          </li>
          <li class="search-contents">
            <select name="" id="">
              <option value="">폴더명 검색</option>
            </select>
            <input type="search" placeholder="폴더명으로 검색해주세요." />
            <button class="btn2-1">검색</button>
          </li>
        </ul>
      </article>
    </section>
    <section>
      <article>
        <ul class="current-bar">
          <li>
            <h2>전체 폴더</h2>
            <b>5</b>
            <h2>건</h2>
          </li>
        </ul>
      </article>
      <article class="basic-article">
        <table class="table1">
          <tr class="table1-head">
            <th><span>폴더 경로</span></th>
            <th><span>나의 진행률</span></th>
            <th><span>작업필요</span></th>
            <th><span>작업완료</span></th>
            <th><span>반려</span></th>
          </tr>
          <tr v-for="project in myProjects" :key="project.id" class="card mt-2">
            <td class="align1 folder-name">
              <img
                src="../../../assets/images/project/icon/icon-folder.svg"
                alt=""
              /><a href="my-work-file.html">{{ project.projectName }}</a>
            </td>
            <td>
              <div class="progress-wrap">
                <progress min="0" max="100" value="10"></progress>
                <p>{{ project.projectProgress }}</p>
              </div>
            </td>
            <td>
              <span>{{ project.todo }}</span>
            </td>
            <td>
              <span>{{ project.done }}</span>
            </td>
            <td>
              <span>{{ project.rejected }}</span>
            </td>
          </tr>
        </table>
      </article>
      <article class="pagination">
        <button
          v-if="currentPage !== 1"
          class="page-prev"
          @click="getMyProjects(currentPage - 1)"
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
            <a class="page-link" @click="getMyProjects(page)">{{ page }}</a>
          </li>
        </ul>
        <button
          v-if="currentPage !== numberOfPages"
          class="page-prev"
          @click="getMyProjects(currentPage + 1)"
        >
          <img
            src="../../../assets/images/project/icon/icon-page-next.svg"
            alt=""
          />
        </button>
      </article>
    </section>
  </main>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const myProjects = ref([]);
    const numberOfProjects = ref(0);
    const currentPage = ref(1);
    const limit = 5;
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfProjects.value / limit);
    });
    const getMyProjects = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/myProjects?_sort=id&_order=desc&_page=${page}&_limit=${limit}`,
        );
        numberOfProjects.value = res.headers['x-total-count'];
        myProjects.value = res.data;
        console.log(currentPage.value);
      } catch (err) {
        console.log(err);
      }
    };
    getMyProjects();
    return {
      myProjects,
      getMyProjects,
      currentPage,
      numberOfProjects,
      numberOfPages,
    };
  },
};
</script>

<style></style>
