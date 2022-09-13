<template>
  <div class="sub-menu">
    <div class="sub-menu-top">
      <select name="" id="" v-model="projectCheck">
        <option v-for="(item, index) in AllProjectListItem" :key="index">
          {{ item.projectName }}
        </option>
      </select>
    </div>
    <div class="sub-menu-wrap">
      <div class="sub-menu-title">
        <b class="align1"
          ><img
            src="../../../assets/images/project/header+menu/icon-project.svg"
            alt=""
          />프로젝트 관리</b
        >
      </div>
      <ul class="sub-menu-bottom">
        <li :class="{ 'now-menu': currentPage == 'folderlist' }">
          <router-link to="/allProject/project_cleaning/folderlist"
            >데이터셋</router-link
          >
        </li>
        <li :class="{ 'now-menu': currentPage == 'memberwork' }">
          <router-link to="/allProject/project_cleaning/memberwork"
            >멤버 작업현황</router-link
          >
        </li>
        <li :class="{ 'now-menu': currentPage == 'guidelist' }">
          <router-link to="/allProject/project_cleaning/guidelist"
            >가이드</router-link
          >
        </li>
        <li :class="{ 'now-menu': currentPage == 'qna' }">
          <router-link to="/allProject/project_cleaning/qna">Q&A</router-link>
        </li>
        <li :class="{ 'now-menu': currentPage == 'output' }">
          <router-link to="/allProject/project_cleaning/output"
            >산출물 내보내기</router-link
          >
        </li>
        <li :class="{ 'now-menu': currentPage == 'statistics' }">
          <router-link to="/allProject/project_cleaning/statistics/project"
            >프로젝트 통계</router-link
          >
        </li>
        <li :class="{ 'now-menu': currentPage == 'setting' }">
          <router-link
            :to="'/allProject/project_cleaning/setting/cleaning/' + id"
            >설정</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      id: 11,
      currentPage: '',
      projectCheck: '이상행동(주취행동) 이미지 가공',
      AllProjectListItem: [],
    };
  },
  mounted: function () {
    axios.get('./ProjectData.json').then(response => {
      // console.log(response.data.project);
      this.AllProjectListItem = response.data.project;
      this.AllProjectListItemOrigin = response.data.project;
    });
    console.log(this.AllProjectListItem);
  },
  created() {
    console.log('현재 url' + window.location.href);
    var path = window.location.href.split('/');
    if (path[5] == 'folderlist') {
      this.currentPage = 'folderlist';
    } else if (path[5] == 'memberwork') {
      this.currentPage = 'memberwork';
    } else if (path[5] == 'guidelist') {
      this.currentPage = 'guidelist';
    } else if (path[5] == 'qna') {
      this.currentPage = 'qna';
    } else if (path[5] == 'output') {
      this.currentPage = 'output';
    } else if (path[5] == 'statistics') {
      this.currentPage = 'statistics';
    } else if (path[5] == 'setting' || path[5] == 'membersetting') {
      this.currentPage = 'setting';
    }
    console.log(path[5]);
  },
};
</script>

<style></style>
