<template>
  <main id="main">
    <section>
      <article>
        <ul class="current-bar">
          <li>
            <h2>전체 프로젝트</h2>
            <p>{{ nowDate }}{{ nowTime }} 기준</p>
          </li>
          <li class="bar"></li>
          <li class="button-wrap">
            <button class="btn2-2">보고서 다운로드</button>
          </li>
        </ul>
      </article>
      <article class="about-project">
        <ul class="dashboard-project-info">
          <li>
            <h3>누적 프로젝트 수</h3>
            <span class="under-bar"></span>
            <b>963</b>
          </li>
          <li>
            <h3>진행 중인 프로젝트 수</h3>
            <span class="under-bar"></span>
            <b>80</b>
          </li>
          <li>
            <h3>완료 프로젝트 수</h3>
            <span class="under-bar"></span>
            <b>820</b>
          </li>
          <li>
            <h3>제거된 프로젝트 수</h3>
            <span class="under-bar"></span>
            <b>63</b>
          </li>
        </ul>
      </article>
    </section>
    <section class="pdf">
      <article>
        <ul class="current-bar">
          <li>
            <h2>프로젝트 현황</h2>
          </li>
          <li class="bar"></li>
          <li>
            <select name="" id="">
              <option value="">전체</option>
              <option value="">데이터 수집</option>
              <option value="">데이터 정제/전처리</option>
              <option value="">데이터 가공(라벨링)</option>
            </select>
          </li>

          <li class="search-contents">
            <input
              type="search"
              placeholder="이름과 이메일로 검색해주세요."
              class="search-icon-bar"
            />
            <button class="btn2-0 search-icon-btn">
              <img
                src="../../../assets/images/project/icon/icon-search-btn.svg"
                alt=""
              />
            </button>
          </li>
        </ul>
      </article>
      <article class="basic-article">
        <table class="table1">
          <tr class="table1-head">
            <th>No</th>
            <th>프로젝트 유형</th>
            <th>프로젝트 명</th>
            <th>작업 진행률</th>
            <th>등록일</th>
            <th>마지막 작업일</th>
          </tr>
          <tr v-for="project in projects" :key="project.id" class="card mt-2">
            <td>
              <p>{{ project.id }}</p>
            </td>
            <td>
              <p>{{ project.type }}</p>
            </td>
            <td>
              <button
                @click="moveToProjectDetail(project.id)"
                style="cursor: pointer; color: blue"
              >
                {{ project.projectName }}
              </button>
            </td>
            <td>
              <div class="progress-wrap">
                <progress
                  min="0"
                  max="100"
                  v-bind:value="project.progress"
                ></progress>
                <p>{{ project.progress }}%</p>
              </div>
            </td>
            <td>
              <p>{{ project.startDate }}</p>
            </td>
            <td>
              <p>{{ project.lastSession }}</p>
            </td>
          </tr>
        </table>
      </article>
      <article class="pagination">
        <button class="page-prev">
          <img
            src="../../../assets/images/project/icon/icon-page-prev.svg"
            alt=""
          />
        </button>
        <ul class="pagination-page">
          <li class="now-page">
            <button><span> 1</span></button>
          </li>
          <li>
            <button><span> 2</span></button>
          </li>
          <li>
            <button><span> 3</span></button>
          </li>
          <li>
            <button><span> 4</span></button>
          </li>
          <li>
            <button><span> 5</span></button>
          </li>
        </ul>
        <button class="page-next">
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
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

export default {
  setup() {
    const projects = ref([]);
    const numberOfProjects = ref(0);
    const loadProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/dashboard');
        numberOfProjects.value = res.headers['x-total-count'];
        projects.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    loadProjects();

    const moveToProjectDetail = projectId => {
      router.push('/dashboard/detail/collect/' + projectId);
    };
    return {
      projects,
      loadProjects,
      moveToProjectDetail,
    };
  },
  data: function () {
    return { timer: null, nowWeek: '', nowDate: '', nowTime: '' };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    setNowTimes() {
      //
      let myDate = new Date();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;

      let mm_1 = String(mm < 10 ? '0' + mm : mm);

      let dd = String(
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate(),
      );
      let hou = String(
        myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
      );
      let min = String(
        myDate.getMinutes() < 10
          ? '0' + myDate.getMinutes()
          : myDate.getMinutes(),
      );

      this.nowDate = yy + '/' + mm_1 + '/' + dd + ' ';
      this.nowTime = hou + ':' + min;
    },
  },
};
//   name: 'pdf',
//   data() {
//     return {
//       propTitle: 'mypdf',
//     };
//   },
//   methods: {
//     makePDF(selector = '') {
//       window.html2canvas = html2canvas; //Vue.js 특성상 window 객체에 직접 할당해야한다.
//       let that = this;
//       let pdf = new jsPDF('p', 'mm', 'a4');
//       let canvas = pdf.canvas;
//       const pageWidth = 210; //캔버스 너비 mm
//       const pageHeight = 295; //캔버스 높이 mm
//       canvas.width = pageWidth;

//       let ele = document.querySelector(selector);
//       let width = ele.offsetWidth; // 셀렉트한 요소의 px 너비
//       let height = ele.offsetHeight; // 셀렉트한 요소의 px 높이
//       let imgHeight = (pageWidth * height) / width; // 이미지 높이값 px to mm 변환

//       if (!ele) {
//         console.warn(selector + ' is not exist.');
//         return false;
//       }

//       html2canvas(ele, {
//         onrendered: function (canvas) {
//           let position = 0;
//           const imgData = canvas.toDataURL('image/png');
//           pdf.addImage(
//             imgData,
//             'png',
//             0,
//             position,
//             pageWidth,
//             imgHeight,
//             undefined,
//             'slow',
//           );

//           //Paging 처리
//           let heightLeft = imgHeight; //페이징 처리를 위해 남은 페이지 높이 세팅.
//           heightLeft -= pageHeight;
//           while (heightLeft >= 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight);
//             heightLeft -= pageHeight;
//           }

//           pdf.save(that.propTitle.toLowerCase() + '.pdf');
//         },
//       });
//     },
//   },
// };
</script>

<style></style>
