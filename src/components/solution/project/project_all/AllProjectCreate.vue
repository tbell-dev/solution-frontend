<template>
  <form @submit="submitForm">
    <div id="main-wrap">
      <main id="main">
        <section>
          <article>
            <ul
              v-show="errors.length"
              style="color: red; font-size: 15px; margin-bottom: 10px"
            >
              <li v-for="error in errors" :key="error">*{{ error }}</li>
            </ul>
            <ul class="common-layout1">
              <li class="project-title">
                <h2>프로젝트 명 <span class="star">*</span></h2>
              </li>
              <li class="project-contents">
                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="프로젝트 이름을 입력해주세요."
                    required
                    v-model="projectName"
                    id="top"
                  />
                  <div class="warning" v-show="isprojectNameValid">
                    <img
                      src="../../../../assets/images/project/icon/icon-warning.svg"
                      alt=""
                    /><span>1~50자로 입력해 주세요.</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="common-layout1">
              <li class="project-title">
                <h2>프로젝트 설명</h2>
              </li>
              <li class="project-contents">
                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="프로젝트 설명을 입력해주세요."
                    @input="projectExplain = $event.target.value"
                  />
                  <div class="warning" v-show="isprojectExplainValid">
                    <img
                      src="../../../../assets/images/project/icon/icon-warning.svg"
                      alt=""
                    /><span>1~100자로 입력해 주세요.</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="common-layout1">
              <li class="project-title">
                <h2>프로젝트 유형 <span class="star">*</span></h2>
              </li>
              <li class="project-contents">
                <select
                  name=""
                  id=""
                  v-model="projectType"
                  @change="projectWorkStepSelect()"
                  required
                >
                  <option value="collect">데이터 수집</option>
                  <option value="cleaning">데이터 정제/전처리</option>
                  <option value="labeling">데이터 가공</option>
                </select>
              </li>
            </ul>
          </article>
        </section>
        <section v-show="projectType === 'collect'">
          <article>
            <ul class="current-bar1">
              <li>
                <h2>프로젝트 설정<span class="star">*</span></h2>
              </li>
            </ul>
          </article>
          <!-- 데이터 수집 선택시 -->
          <article class="common1">
            <h3>데이터 유형 <span class="star">*</span></h3>
            <ul class="align1">
              <!--              TODO: button -> div 변경에 따른 스타일 변경-->
              <li style="display: flex">
                <button type="button"
                  @click="collectOwnOnOff"
                  :class="{
                    'btn1-active btn1-3': isCollectOwnOn,
                    'btn1-3': !isCollectOwnOn,
                  }"
                >
                  자체 제공 데이터셋
                </button>
                <button
                  type="button"
                  @click="collectCrawlingOnOff"
                  :class="{
                    'btn1-active btn1-3': isCollectCrawlingOn,
                    'btn1-3': !isCollectCrawlingOn,
                  }"
                >
                  크롤링 수집 데이터
                </button>
              </li>
            </ul>
          </article>
          <!-- 자체제공데이터셋 -->
          <article class="basic-article" v-show="isCollectOwnOn">
            <table class="table1">
              <tr class="table1-head">
                <th>
                  <input
                    type="checkbox"
                    v-model="isAllChecked"
                    value=""
                    @click="allCheck($event.target.checked)"
                  />
                </th>
                <th><span>데이터셋 번호</span></th>
                <th><span>데이터셋 명</span></th>
                <th><span>데이터셋 건수</span></th>
                <th><span>데이터셋 대분류</span></th>
                <th><span>데이터셋 세부분류</span></th>
                <th><span>데이터셋 총 용량</span></th>
              </tr>
              <tr v-for="(item, index) in collectOwnListItem" :key="index">
                <td>
                  <input
                    type="checkbox"
                    :value="'id' + index"
                    v-model="item.selected"
                    @change="clickFunc"
                  />
                </td>
                <td>
                  <span>{{ index + 1 }}</span>
                </td>
                <td>
                  <span>{{ item.datasetName }}</span>
                </td>
                <td>
                  <span>{{ item.datasetCount }}</span>
                </td>
                <td>
                  <span>{{ item.datasetMainCate }}</span>
                </td>
                <td>
                  <span>{{ item.datasetSubCate }}</span>
                </td>
                <td>
                  <span>{{ item.datasetVolume }}</span>
                </td>
              </tr>
            </table>
          </article>
          <!-- 크롤링 수집 데이터 -->
          <article
            class="common1 crolling-collect-data"
            v-show="isCollectCrawlingOn"
          >
            <h3>수집 채널</h3>
            <ul class="align1">
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-chanel"
                    id="collect-chanel-naver"
                    v-model="crawling_channel_type"
                    value="naver"
                  />
                  <label for="collect-chanel-naver"
                    >네이버<span>(NAVER)</span></label
                  >
                </div>
                <div class="img-wrap">
                  <img
                    src="../../../../assets/images/project/img/naver.svg"
                    alt=""
                  />
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-chanel"
                    id="collect-chanel-daum"
                    v-model="crawling_channel_type"
                    value="daum"
                  />
                  <label for="collect-chanel-daum"
                    >다음 <span>(DAUM)</span></label
                  >
                </div>
                <div class="img-wrap">
                  <img
                    src="../../../../assets/images/project/img/daum.svg"
                    alt=""
                  />
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-chanel"
                    id="collect-chanel-google"
                    v-model="crawling_channel_type"
                    value="google"
                  />
                  <label for="collect-chanel-google"
                    >구글 <span>(Google)</span></label
                  >
                </div>
                <div class="img-wrap">
                  <img
                    src="../../../../assets/images/project/img/google.svg"
                    alt=""
                  />
                </div>
              </li>
            </ul>
            <h3>키워드</h3>
            <ul class="align1">
              <li>
                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="키워드를 입력하세요."
                    v-model="crawling_keywords"
                  />
                  <div class="warning" v-show="isCollectCrawlingKeywordValid">
                    <img
                      src="../../../../assets/images/project/icon/icon-warning.svg"
                      alt=""
                    /><span>1~10자로 입력해 주세요.</span>
                  </div>
                </div>
              </li>
            </ul>
            <h3>수집 기간</h3>
            <ul class="align1">
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-date"
                    id="collect-date-week"
                    v-model="crawling_period_type"
                    value="2"
                  />
                  <label for="collect-date-week">1주일</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-date"
                    id="collect-date-month"
                    v-model="crawling_period_type"
                    value="3"
                  />
                  <label for="collect-date-month">3개월</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-date"
                    id="collect-date-year"
                    v-model="crawling_period_type"
                    value="4"
                  />
                  <label for="collect-date-year">1년</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-date"
                    id="collect-date-set"
                    v-model="crawling_period_type"
                    value="1"
                  />
                  <label for="collect-date-set">직접입력</label>
                  <Datepicker
                    class="datepicker"
                    v-model="crawling_period_input"
                    v-show="crawling_period_type === '1'"
                    range
                    multi-calendars
                    :enable-time-picker="false"
                    auto-apply
                  />
                </div>
              </li>
            </ul>
            <h3>수집 건수</h3>
            <ul class="align1">
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-case"
                    id="collect-case-100"
                    v-model="crawling_limit"
                    value="100"
                  />
                  <label for="collect-case-100">100</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-case"
                    id="collect-case-500"
                    v-model="crawling_limit"
                    value="500"
                  />
                  <label for="collect-case-500">500</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-case"
                    id="collect-case-1000"
                    v-model="crawling_limit"
                    value="1000"
                  />
                  <label for="collect-case-1000">1000</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-case"
                    id="collect-case-2000"
                    v-model="crawling_limit"
                    value="2000"
                  />
                  <label for="collect-case-2000">2000</label>
                </div>
              </li>
              <li>
                <div class="radio-wrap">
                  <input
                    type="radio"
                    name="collect-case"
                    id="collect-case-3000"
                    v-model="crawling_limit"
                    value="3000"
                  />
                  <label for="collect-case-3000">3000</label>
                </div>
              </li>
              <li>
                <label for="collect-case-set" class="margin-r10"
                  >직접 입력:</label
                >
                <input
                  type="number"
                  name="collect-case"
                  id="collect-case-set"
                  v-model="crawling_limit"
                />
              </li>
            </ul>
          </article>
        </section>
        <section v-show="projectType === 'labeling'">
          <article>
            <ul class="current-bar1">
              <li>
                <h2>프로젝트 설정<span class="star">*</span></h2>
              </li>
            </ul>
          </article>
          <article>
            <h3>클래스 유형 <span class="star">*</span></h3>
          </article>
          <article class="align0">
            <ul class="project-class-setting">
              <li class="class-setting-title">
                <h3>클래스</h3>
              </li>
              <li class="align2 class-setting-contents-input">
                <input
                  type="text"
                  placeholder="클래스 입력 후 Enter"
                  @keydown.enter.prevent="addCate"
                  v-model="AnnotationCategory.annotation_category_name"
                  @focus="isActiveClassSettingTitle = true"
                />
              </li>
              <li
                v-bind:class="{
                  'align1 class-setting-contents class-setting-contents-se':
                    this.isClassSelectOn[index],
                  'align1 class-setting-contents': !this.isClassSelectOn[index],
                }"
                v-for="(item, index) in project_categories"
                :key="index"
              >
                <button
                  class="close"
                  @click="classNameDelete(index)"
                  v-show="!this.isClassSelectOn[index]"
                  type="button"
                  style="cursor: pointer"
                >
                  <img
                    src="../../../../assets/images/project/icon/icon-close01.svg"
                    alt=""
                  />
                </button>
                <button
                  class="close"
                  @click="classNameDelete(index)"
                  v-show="this.isClassSelectOn[index]"
                  type="button"
                  style="cursor: pointer"
                >
                  <img
                    src="../../../../assets/images/project/icon/icon-close02.svg"
                    alt=""
                  />
                </button>
                <div style="float: right; cursor: pointer">
                  <input
                    type="color"
                    v-model="item.annotation_category_color"
                  />
                </div>
                <b
                  :class="{ selectedAttr: isClassSelectOn[index] }"
                  @click="isClassSelectOnOff(index)"
                >
                  {{ item.annotation_category_name }}</b
                >
                <button
                  type="button"
                  class="class-more"
                  v-show="isClassSelectOn[index]"
                  style="cursor: pointer"
                >
                  <img
                    src="../../../../assets/images/project/icon/icon-arrow01.svg"
                    alt=""
                  />
                </button>
              </li>
            </ul>
            <div
              v-for="(item, index) in project_categories"
              :key="index"
              v-show="this.isClassSelectOn[index]"
            >
              <ul class="project-class-setting">
                <li class="class-setting-title">
                  <h3>클래스 별 속성</h3>
                </li>
                <li
                  class="align1 class-setting-contents"
                  v-for="(item, itemIndex) in project_categories[index]
                    .annotation_category_attributes"
                  :key="item"
                >
                  <button
                    class="close"
                    @click="deleteAttr(index, itemIndex)"
                    v-show="!this.isAttrSelectOn[itemIndex]"
                    type="button"
                    style="cursor: pointer"
                  >
                    <img
                      src="../../../../assets/images/project/icon/icon-close01.svg"
                      alt=""
                    />
                  </button>
                  <button
                    class="close"
                    @click="deleteAttr(index, itemIndex)"
                    v-show="this.isAttrSelectOn[itemIndex]"
                    type="button"
                    style="cursor: pointer"
                  >
                    <img
                      src="../../../../assets/images/project/icon/icon-close02.svg"
                      alt=""
                    />
                  </button>
                  <b
                    :class="{ selectedAttr: isAttrSelectOn[itemIndex] }"
                    @click.stop="isAttrSelectOnOff(index, itemIndex)"
                    >{{ item.annotation_category_attr_name }}
                  </b>
                </li>
              </ul>
            </div>
            <div
              v-for="(item, index) in project_categories"
              :key="index"
              v-show="this.isClassSelectOn[index]"
            >
              <div class="class-setting-title2 align1">
                <!--              <div class="class-setting-title2-select align2">-->
                <!--                <h3>공통속성</h3>-->
                <!--              </div>-->
                <div class="align2 class-setting-title2-select">
                  <h3>클래스 별 속성 수정/추가</h3>
                </div>
              </div>
              <ul class="class-setting-contents2">
                <li class="attribute-wrap">
                  <!-- 단일선택형 -->
                  <div class="align0 attribute-inner">
                    <div>
                      <h3>속성명</h3>
                      <input
                        type="text"
                        v-model="
                          AnnotationCategoryAttribute.annotation_category_attr_name
                        "
                      />
                    </div>
                    <div>
                      <h3>속성유형</h3>
                      <select
                        name=""
                        id=""
                        v-model="
                          AnnotationCategoryAttribute.annotation_category_attr_type
                        "
                      >
                        <option value="1">단일 선택형</option>
                        <option value="2">다중 선택형</option>
                        <option value="3">입력형</option>
                      </select>
                    </div>
                  </div>
                  <div class="attribute-inner" v-show="propertyType === '1'">
                    <h3>속성값</h3>
                    <input
                      type="text"
                      v-model="attrValue"
                      placeholder="속성 값 입력 후 Enter"
                      @keydown.enter.prevent="addAttributeValue(index)"
                    />
                    <div
                      v-show="
                        AnnotationCategoryAttribute.annotation_category_attr_val
                          .length
                      "
                      class="attribute-value align3"
                    >
                      <span
                        class="align2"
                        v-for="(
                          attribute, index
                        ) in AnnotationCategoryAttribute.annotation_category_attr_val"
                        :key="attribute"
                        >{{ attribute }}
                        <button
                          type="button"
                          @click="deleteAttrValue(index)"
                          style="cursor: pointer"
                        >
                          <img
                            src="../../../../assets/images/project/icon/icon-close01.svg"
                            alt=""
                          /></button
                      ></span>
                    </div>
                  </div>
                  <!-- 다중선택형 -->
                  <div
                    class="attribute-inner"
                    v-show="
                      AnnotationCategoryAttribute.annotation_category_attr_type ===
                      '2'
                    "
                  >
                    <div class="align0 attribute-inner">
                      <div>
                        <h3>최소 선택 수</h3>
                        <input
                          type="number"
                          v-model="
                            AnnotationCategoryAttribute.annotation_category_attr_limit_min
                          "
                        />
                      </div>
                      <div>
                        <h3>최대 선택 수</h3>
                        <input
                          type="number"
                          v-model="
                            AnnotationCategoryAttribute.annotation_category_attr_limit_max
                          "
                        />
                      </div>
                    </div>
                  </div>
                  <!-- 입력형 -->
                  <div
                    class="attribute-inner"
                    v-show="
                      AnnotationCategoryAttribute.annotation_category_attr_type ===
                      '3'
                    "
                  >
                    <div class="attribute-inner">
                      <h3>숫자입력 값</h3>
                      <div class="align4">
                        <input type="number" />
                        <span>~</span>
                        <input type="number" />
                      </div>
                    </div>
                    <!--                    <div class="attribute-inner">-->
                    <!--                      <h3>글자입력 수</h3>-->
                    <!--                      <div class="align4">-->
                    <!--                        <input-->
                    <!--                          type="number"-->
                    <!--                          v-model="AnnotationCategoryAttribute.categoryAttrLengthMin"-->
                    <!--                        />-->
                    <!--                        <span>~</span>-->
                    <!--                        <input-->
                    <!--                          type="number"-->
                    <!--                          v-model="AnnotationCategoryAttribute.categoryAttrLengthMax"-->
                    <!--                        />-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </div>
                </li>

                <li class="attribute-wrap align4 attribute-add">
                  <div v-show="!isAttrSelected" style="margin: auto">
                    <b>추가하기</b>
                    <button
                      type="button"
                      :disabled="isFullFilled"
                      @click="addAttribute(index)"
                    >
                      <img
                        style="cursor: pointer"
                        src="../../../../assets/images/project/icon/icon-add2.svg"
                        alt=""
                      />
                    </button>
                  </div>
                  <div v-show="isAttrSelected" style="margin: auto">
                    <b>수정</b>
                    <img
                      @click="updateAttribute(index, selectedAttrIndex)"
                      src="../../../../assets/images/project/icon/icon-add2.svg"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </section>
        <section>
          <article>
            <ul class="current-bar1">
              <li>
                <h2>작업단계</h2>
              </li>
            </ul>
          </article>
          <article>
            <ul class="project-create-work-stage">
              <li>
                <div class="left"><h3>1단계</h3></div>
                <div class="right">{{ this.projectWorkStep }}</div>
              </li>
              <li>
                <div class="left"><h3>2단계</h3></div>
                <div class="right">검수</div>
              </li>
              <li>
                <div class="left"><h3>3단계</h3></div>
                <div class="right">최종</div>
              </li>
            </ul>
          </article>
        </section>
        <div class="button-align1" @click.stop="submitForm">
          <button class="btn-set btn2-1">생성</button>
          <router-link
            :to="{
              name: 'allprojectlist',
              params: { projectName: this.projectName },
            }"
            class="btn-set btn1-1"
            >취소</router-link
          >
        </div>
      </main>
      <!--    클래스 세부 설정-->
      <div class="project-popup-wrap" v-show="isPopUpOn">
        <ul class="project-popup1">
          <li class="project-popup-title align2">
            <h2>클래스 세부 설정</h2>
            <button
              type="button"
              style="cursor: pointer"
              @click="isPopUpOn = false"
            >
              <img
                src="../../../../assets/images/project/icon/icon-close03.svg"
                alt=""
              />
            </button>
          </li>
          <li class="project-popup-contents">
            <div class="project-popup-inner">
              <h3>클래스 추가</h3>
              <input type="text" placeholder="클래스 입력 후 Enter" />
            </div>
            <div class="project-popup-inner">
              <table class="table3">
                <tr class="table3-head">
                  <th><span>색상</span></th>
                  <th><span>클래스명</span></th>
                  <th><span>실제 작업 클래스명</span></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <span>
                      <input type="color" value="#8579F3" />
                    </span>
                  </td>
                  <td><span>person1</span></td>
                  <td><span>person1</span></td>
                  <td>
                    <button type="button" style="cursor: pointer">
                      <img
                        src="../../../../assets/images/project/icon/icon-delete.svg"
                        alt=""
                      />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <input type="color" value="#3580E3" />
                    </span>
                  </td>
                  <td><span>person1</span></td>
                  <td><span>person1</span></td>
                  <td>
                    <button type="button" style="cursor: pointer">
                      <img
                        src="../../../../assets/images/project/icon/icon-delete.svg"
                        alt=""
                      />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <input type="color" value="#DE61A6" />
                    </span>
                  </td>
                  <td><span>person1</span></td>
                  <td><span>person1</span></td>
                  <td>
                    <button type="button" style="cursor: pointer">
                      <img
                        src="../../../../assets/images/project/icon/icon-delete.svg"
                        alt=""
                      />
                    </button>
                  </td>
                </tr>
              </table>
            </div>
            <div class="align6">
              <button type="button" style="cursor: pointer" class="btn2-1">
                저장
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="alert-wrap">
        <ul class="alert">
          <li class="alert-top">
            <h2>
              입력된 건수를 채우지 못하고 제한 용량에 도달하면 데이터 수집이
              마무리됩니다.
            </h2>
          </li>
          <li class="alert-bottom align6">
            <button type="button" style="cursor: pointer" class="btn2-1">
              확인
            </button>
          </li>
        </ul>
      </div>
    </div>
  </form>
  <!--  <button @click="scroll" >scroll</button>-->
</template>

<script>
//import fs from 'fs';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import _ from 'lodash';
import axios from 'axios';
import router from '@/router';

export default {
  components: { Datepicker },
  mounted() {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    this.crawling_period_input = [startDate, endDate];
  },
  data() {
    return {
      //1. 전체
      projectName: '', //프로젝트 명
      projectExplain: '', //프로젝트 설명
      projectType: 'collect', //프로젝트 유형

      //1-1.데이터 수집
      isCollectOwnOn: true, //자제 제공 데이터셋
      isCollectCrawlingOn: false, //크롤링 수집 데이터
      data_type: -1,
      crawling_channel_type: '', //수집채널
      crawling_keywords: '', //키워드
      crawling_period_type: '', //수집 기간
      crawling_period_input: '', //수집 기간-직접입력값
      crawling_limit: '', //수집 건수
      //1-1-1.자체 제공 데이터셋
      checkedCollectOwn: [], //목록 선택 체크박스
      collectOwnListItem: [
        //데이터셋 목록
        {
          id: 1,
          datasetName: '인간 자세 데이터셋_001',
          datasetCount: '100',
          datasetMainCate: '인간',
          datasetSubCate: '폭력',
          datasetVolume: '3GB',
        },
        {
          id: 2,
          datasetName: '인간 자세 데이터셋_001',
          datasetCount: '100',
          datasetMainCate: '인간',
          datasetSubCate: '폭력',
          datasetVolume: '3GB',
        },
        {
          id: 3,
          datasetName: '인간 자세 데이터셋_001',
          datasetCount: '100',
          datasetMainCate: '인간',
          datasetSubCate: '폭력',
          datasetVolume: '3GB',
        },
      ],
      isAllChecked: false,
      //1-1-2.크롤링 수집 데이터

      //1-2.데이터 정제/전처리
      isCleaningOn: true, //데이터 정제
      isPreprocessingOn: false, //데이터 전처리

      //1-2-1.영상/이미지 정제
      CleaningFunction: 'CleaningFunctionFrame',

      //1-2-2.이미지 전처리
      PreprocessingFunction: [],

      className: '',

      isPopUpOn: false, //클래스 세부 설정 팝업
      propertyType: '1',
      classSettingMultipleChoice: false,

      project_categories: [],
      categoryAttrsTemp: [],
      AnnotationCategory: {
        annotation_category_name: '',
        annotation_category_parent_id: -1,
        annotation_category_color: '',
        annotation_category_attributes: [],
      },
      AnnotationCategoryAttribute: {
        annotation_category_attr_name: '',
        annotation_category_attr_desc: '',
        annotation_category_attr_type: '',
        annotation_category_attr_val: [],
        annotation_category_attr_limit_min: 0,
        annotation_category_attr_limit_max: 1,
      },
      AnnotationCategoryAttributeOrigin: {
        annotation_category_attr_name: '',
        annotation_category_attr_desc: '',
        annotation_category_attr_type: '',
        annotation_category_attr_val: [],
        annotation_category_attr_limit_min: 0,
        annotation_category_attr_limit_max: 1,
      },
      isClassSelectOn: [],
      isAttrSelectOn: [],
      selectedAttrIndex: -1,
      attributes: [],
      attrValue: '',
      projectWorkStep: '수집',
      errors: [],
    };
  },
  computed: {
    isprojectNameValid() {
      return this.projectName.length < 1 || this.projectName.length > 50;
    },
    isprojectExplainValid() {
      return this.projectExplain.length < 1 || this.projectExplain.length > 100;
    },
    isCollectCrawlingKeywordValid() {
      return (
        this.crawling_keywords.length < 1 || this.crawling_keywords.length > 10
      );
    },
    selectedDataSet() {
      return this.collectOwnListItem.filter(item => {
        return item.selected === true;
      });
    },
    isAttrSelected() {
      return (
        this.isAttrSelectOn.filter(item => {
          return item === true;
        }).length === 1
      );
    },
    isFullFilled() {
      return !(
        this.AnnotationCategoryAttribute.annotation_category_attr_type !== '' &&
        this.AnnotationCategoryAttribute.annotation_category_attr_val.length !==
          0
      );
    },
    crawling_period_start() {
      return new Date(this.crawling_period_input[0]).getTime();
    },
    crawling_period_end() {
      return new Date(this.crawling_period_input[1]).getTime();
    },
    project_type_id() {
      switch (this.projectType) {
        case 'collect':
          return 1;
        case 'cleaning':
          return 2;
        case 'labeling':
          return 4;
      }
      return 1;
    },
  },
  methods: {
    projectWorkStepSelect: function () {
      if (this.projectType === 'collect') {
        this.projectWorkStep = '수집';
      } else if (this.projectType === 'cleaning') {
        this.projectWorkStep = '정제';
      } else if (this.projectType === 'labeling') {
        this.projectWorkStep = '가공';
      }
    },
    //데이터 수집 프로젝트 설정 - 데이터 유형
    collectOwnOnOff: function () {
      this.isCollectOwnOn = true;
      this.isCollectCrawlingOn = false;
      this.data_type = 0;
    },
    collectCrawlingOnOff: function () {
      this.isCollectOwnOn = false;
      this.isCollectCrawlingOn = true;
      this.data_type = 1;
    },
    //데이터 정제/전처리 프로젝트 설정 - 데이터 유형

    classNameDelete(index) {
      this.project_categories.splice(index, 1);
      this.categoryAttrsTemp.splice(index, 1);
      this.unselectAll();
    },
    deleteAttr(index, itemIndex) {
      this.project_categories[index].annotation_category_attributes.splice(
        itemIndex,
        1,
      );
      this.unselectAll();
    },
    isPopUpOnOff() {
      this.isPopUpOn = !this.isPopUpOn;
    },
    isClassSelectOnOff(index) {
      for (let index = 0; index < this.isClassSelectOn.length; index++) {
        this.isClassSelectOn[index] = false;
      }
      this.isClassSelectOn[index] = !this.isClassSelectOn[index];
      this.initClass(index);
    },
    isAttrSelectOnOff(index, itemIndex) {
      this.AnnotationCategoryAttribute = _.cloneDeep(
        this.project_categories[index].annotation_category_attributes[
          itemIndex
        ],
      );
      for (let i = 0; i < this.isAttrSelectOn.length; i++) {
        if (i === itemIndex) continue;
        this.isAttrSelectOn[i] = false;
      }
      this.isAttrSelectOn[itemIndex] = !this.isAttrSelectOn[itemIndex];
      console.log(this.isAttrSelectOn);
      this.selectedAttrIndex = itemIndex;
      if (!this.isAttrSelectOn[itemIndex]) {
        this.initClass(index);
      }
    },
    initClass(index) {
      this.isAttrSelectOn = new Array(
        this.project_categories[index].annotation_category_attributes.length,
      );
      this.isAttrSelectOn.fill(false);
      this.AnnotationCategoryAttribute = this.categoryAttrsTemp[index];
      this.attrValue = '';
    },
    async submitForm(e) {
      this.formValidation();
      e.preventDefault();
      if (this.errors.length > 0) {
        alert('해당 항목을 입력해주세요');
        console.log(this.errors);
        return;
      }
      let ProjectDetail = {};
      // //TODO: requestBody 데이터 추가
      if (this.project_type_id === 1) {
        this.ProjectDetail = {
          data_type: this.data_type,
          dataset_ids: this.selectedDataSet,
          crawling_channel_type: this.crawling_channel_type,
          crawling_keywords: [this.crawling_keywords],
          crawling_period_type: this.crawling_period_type,
          crawling_period_start: this.crawling_period_start,
          crawling_period_end: this.crawling_period_end,
          crawling_limit: this.crawling_limit,
        };
      } else if (this.project_type_id === 4) {
        this.ProjectDetail = {
          project_categories: this.project_categories,
        };
      }
      try {
        await axios.post(
          'http://210.113.122.196:8825/rest/api/1/project/create',
          {
            project_name: this.projectName,
            project_desc: this.projectExplain,
            project_type: {
              project_type_id: this.project_type_id,
              project_type_name: this.projectType,
            },
            project_detail: this.ProjectDetail,
          },
        );
      } catch (err) {
        console.log(err);
      }

      alert('프로젝트가 생성되었습니다.');
      await this.$router.push('allprojectlist');
    },

    initForm() {
      this.projectName = '';
      this.projectExplanation = '';
      this.className = '';
      this.propertyName = '';
      this.selectType = '';
      this.selectPropertyValue = '';
      this.selectMinSelect = '';
      this.selectMaxSelect = '';
      this.inputNumber1 = '';
      this.inputNumber2 = '';
      this.inputString1 = '';
      this.inputString2 = '';
      this.workStep1 = '';
      this.workStep2 = '';
    },
    unselectAll: function () {
      for (let i = 0; i < this.isClassSelectOn.length; i++) {
        this.isClassSelectOn[i] = false;
      }
      for (let attr = 0; attr < this.isAttrSelectOn.length; attr++) {
        this.isAttrSelectOn[attr] = false;
      }
    },
    addCate: function () {
      if (!this.AnnotationCategory.annotation_category_name) {
        alert('값을 입력해주세요');
        return;
      }
      for (const item of this.project_categories) {
        if (
          item.annotation_category_name ===
          this.AnnotationCategory.annotation_category_name
        ) {
          alert('이미 존재하는 값입니다');
          return;
        }
      }
      this.unselectAll();
      let AnnotationCategory = _.cloneDeep(this.AnnotationCategory);
      while (AnnotationCategory.annotation_category_color.length !== 7) {
        AnnotationCategory.annotation_category_color = `#${Math.round(
          Math.random() * 0xffffff,
        ).toString(16)}`;
      }
      this.project_categories.push(AnnotationCategory);
      this.categoryAttrsTemp.push(
        _.cloneDeep(this.AnnotationCategoryAttributeOrigin),
      );
      this.AnnotationCategory.annotation_category_name = '';
    },
    allCheck(checked) {
      this.isAllChecked = checked;
      for (let i in this.collectOwnListItem) {
        this.collectOwnListItem[i].selected = this.isAllChecked;
      }
    },
    addAttributeValue(index) {
      if (
        this.AnnotationCategoryAttribute.annotation_category_attr_val.includes(
          this.attrValue,
        )
      ) {
        alert('속성값이 이미 존재합니다');
        return;
      }
      this.AnnotationCategoryAttribute.annotation_category_attr_val.push(
        this.attrValue,
      );
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttribute,
      );
      this.attrValue = '';
    },
    deleteAttrValue(index) {
      this.AnnotationCategoryAttribute.annotation_category_attr_val.splice(
        index,
        1,
      );
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttribute,
      );
    },
    addAttribute(index) {
      for (const item of this.project_categories[index]
        .annotation_category_attributes) {
        if (
          item.annotation_category_attr_name ===
          this.AnnotationCategoryAttribute.annotation_category_attr_name
        ) {
          alert('속성명이 이미 존재합니다.');
          return;
        }
      }
      if (
        this.AnnotationCategoryAttribute.annotation_category_attr_name === ''
      ) {
        alert('속성명을 적어주세요.');
        return;
      }
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttribute,
      );
      this.project_categories[index].annotation_category_attributes.push(
        this.categoryAttrsTemp[index],
      );
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttributeOrigin,
      );
      this.AnnotationCategoryAttribute = _.cloneDeep(
        this.AnnotationCategoryAttributeOrigin,
      );
      this.attrValue = '';
    },
    updateAttribute(index, attrIndex) {
      for (const item of this.project_categories[index]
        .annotation_category_attributes) {
        if (
          item.annotation_category_attr_name ===
          this.AnnotationCategoryAttribute.annotation_category_attr_name
        ) {
          alert('속성명이 이미 존재합니다.');
          return;
        }
      }
      if (
        this.AnnotationCategoryAttribute.annotation_category_attr_name === ''
      ) {
        alert('속성명을 적어주세요.');
        return;
      }
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttribute,
      );
      this.project_categories[index].annotation_category_attributes[attrIndex] =
        this.categoryAttrsTemp[index];
      this.categoryAttrsTemp[index] = _.cloneDeep(
        this.AnnotationCategoryAttributeOrigin,
      );
      this.AnnotationCategoryAttribute = _.cloneDeep(
        this.AnnotationCategoryAttributeOrigin,
      );
      this.attrValue = '';
      this.isAttrSelectOnOff(index, attrIndex);
    },
    isCollectedOwn: function () {
      return this.data_type === 0;
    },
    isCrawlingData: function () {
      return this.data_type === 1;
    },
    formValidation() {
      this.errors = [];
      if (this.projectName.length > 50 || this.projectName.length === 0) {
        this.errors.push('프로젝트 명을 다시 입력해주세요');
        return;
      }
      if (
        this.projectExplain.length > 100 ||
        this.projectExplain.length === 0
      ) {
        this.errors.push('프로젝트 설명을 다시 입력해주세요');
        return;
      }
      if (!this.projectType) {
        this.errors.push('프로젝트 유형을 선택해주세요.');
        return;
      }
      if (this.projectType === 'collect') {
        if (this.isCollectedOwn()) {
          if (!this.selectedDataSet.length) {
            this.errors.push('자체 제공 데이터셋을 한개 이상 선택해주세요');
            return;
          }
        } else if (this.isCrawlingData()) {
          if (!this.crawling_channel_type) {
            this.errors.push('수집 채널을 선택해주세요');
            return;
          }
          if (!this.crawling_keywords) {
            this.errors.push('키워드를 입력해주세요');
            return;
          }
          if (!this.crawling_period_type) {
            this.errors.push('수집 기간을 선택해주세요');
            return;
          }
          if (!this.crawling_limit) {
            this.errors.push('수집 건수를 선택해주세요');
            return;
          }
        }
      }
    },
  },
};
</script>

<style>
.selectedAttr {
  color: blue;
  font-weight: 800;
}
</style>
