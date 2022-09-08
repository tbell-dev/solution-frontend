<template>
  <div id="project-wrap">
    <div class="left-wrap"><MainMenu /><SubMenu /></div>
    <div class="right-wrap">
      <Header />
      <main id="main">
        <section>
          <article class="align1 button-filter">
            <router-link
              to="/allProject/project_cleaning/setting/cleaning"
              class="btn-set btn2-2"
              >프로젝트 정보</router-link
            >
            <router-link
              to="/allProject/project_cleaning/membersetting/cleaning"
              class="btn-set btn1-2"
              >프로젝트 멤버</router-link
            >
          </article>
        </section>
        <section>
          <article class="common1">
            <h3>프로젝트 명</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectName" />
              </li>
            </ul>
            <h3>프로젝트 설명</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectDesc" />
              </li>
            </ul>
            <h3>프로젝트 유형</h3>
            <ul class="align1">
              <li>
                <input type="text" v-model="projectType" readonly />
              </li>
            </ul>
            <h3>프로젝트 설정</h3>
            <ul class="align1"></ul>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
// 메뉴
import MainMenu from '../../../../components/solution/common/MenuMain.vue';
import SubMenu from '../../../../components/solution/common/MenuSub1.vue';
// 헤더
import Header from '../../../../components/solution/common/Header.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  components: {
    MainMenu,
    SubMenu,
    Header,
  },
  data: function () {},
  methods: {},
  setup() {
    const projectName = ref('');
    const projectDesc = ref('');
    const projectType = ref('');
    onMounted(async () => {
      const res = await axios.get(
        'http://210.113.122.196:8825/rest/api/1/project?project_id=15',
      );
      console.log(res.data);
      projectName.value = res.data.project_name;
      projectDesc.value = res.data.project_desc;
      projectType.value = res.data.project_type.project_type_name;
      console.log(projectName.value);
    });
    return {
      projectName,
      projectDesc,
      projectType,
    };
  },
};
</script>

<style>
@import '../../../../css/reset.css';
@import '../../../../css/common.css';
</style>
