<template>
  <div id="main-wrap">
    <main id="main">
      <section>
        <article>
          <ul class="common-layout1">
            <li class="project-title">
              <h2>프로젝트 명 <span class="star">*</span></h2>
            </li>
            <li class="project-contents">
              <div class="input-wrap">
                <input
                  type="text"
                  placeholder="프로젝트 이름을 입력해주세요."
                  @input="projectName = $event.target.value"
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
            <li>
              <button
                @click="collectOwnOnOff"
                :class="{
                  'btn1-active btn1-3': isCollectOwnOn,
                  'btn1-3': !isCollectOwnOn,
                }"
              >
                자체 제공 데이터셋
              </button>
              <button
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
                  v-model="collectCrawlingChannel"
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
                  v-model="collectCrawlingChannel"
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
                  v-model="collectCrawlingChannel"
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
                  v-model="collectCrawlingKeyword"
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
                  v-model="collectCrawlingPeriod"
                  value="1"
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
                  v-model="collectCrawlingPeriod"
                  value="2"
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
                  v-model="collectCrawlingPeriod"
                  value="3"
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
                  v-model="collectCrawlingPeriod"
                  value="0"
                />
                <label for="collect-date-set">직접입력</label>
                <Datepicker
                  class="datepicker"
                  v-model="collectCrawlingPeriodInput"
                  v-show="collectCrawlingPeriod === '0'"
                  range
                  multiCalendars
                  :enableTimePicker="false"
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
                  v-model="collectCrawlingCount"
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
                  v-model="collectCrawlingCount"
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
                  v-model="collectCrawlingCount"
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
                  v-model="collectCrawlingCount"
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
                  v-model="collectCrawlingCount"
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
                type="text"
                name="collect-case"
                id="collect-case-set"
                v-model="collectCrawlingCount"
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
              <button @click="isPopUpOnOff()">
                <img
                  src="../../../../assets/images/project/icon/icon-setting.svg"
                  alt=""
                />
              </button>
            </li>
            <li class="align2 class-setting-contents-input">
              <input
                type="text"
                placeholder="클래스 입력 후 Enter"
                @keydown.enter.stop="addCate"
                v-model="categoryItem.categoryName"
                @focus="isActiveClassSettingTitle = true"
              />
            </li>
            <li
              v-bind:class="{
                'align1 class-setting-contents class-setting-contents-se':
                  this.isClassSelectOn[index],
                'align1 class-setting-contents': !this.isClassSelectOn[index],
              }"
              v-for="(item, index) in categoryItems"
              :key="index"
            >
              <button
                class="close"
                @click="classNameDelete(index)"
                v-show="!this.isClassSelectOn[index]"
              >
                <img
                  src="../../../../assets/images/project/icon/icon-close01.svg"
                  alt=""
                /></button
              ><button
                class="close"
                @click="classNameDelete(index)"
                v-show="this.isClassSelectOn[index]"
              >
                <img
                  src="../../../../assets/images/project/icon/icon-close02.svg"
                  alt=""
                /></button
              ><b @click="isClassSelectOnOff(index)"> {{ item.categoryName }}</b
              ><button class="class-more" v-show="isClassSelectOn[index]">
                <img
                  src="../../../../assets/images/project/icon/icon-arrow01.svg"
                  alt=""
                />
              </button>
            </li>
          </ul>
          <div
            v-for="(item, index) in categoryItems"
            :key="index"
            v-show="this.isClassSelectOn[index]"
          >
            <ul class="project-class-setting">
              <li class="class-setting-title">
                <h3>클래스 별 속성</h3>
              </li>
              <li
                class="align1 class-setting-contents"
                v-for="item in categoryItems[index].categoryAttrItems"
                :key="item"
              >
                <b>{{ item.categoryAttrName }}</b>
              </li>
            </ul>
          </div>
          <div
            v-for="(item, index) in categoryItems"
            :key="index"
            v-show="this.isClassSelectOn[index]"
          >
            <div class="class-setting-title2 align1">
              <!--              <div class="class-setting-title2-select align2">-->
              <!--                <h3>공통속성</h3>-->
              <!--              </div>-->
              <div class="align2 class-setting-title2-select">
                <h3>클래스 별 속성 추가</h3>
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
                      v-model="categoryAttrItem.categoryAttrName"
                    />
                  </div>
                  <div>
                    <h3>속성유형</h3>
                    <select
                      name=""
                      id=""
                      v-model="categoryAttrItem.categoryAttrType"
                    >
                      <option value="classSettingsignleSelect">
                        단일 선택형
                      </option>
                      <option value="classSettingMultipleSelect">
                        다중 선택형
                      </option>
                      <option value="classSettingInput">입력형</option>
                    </select>
                  </div>
                </div>
                <div
                  class="attribute-inner"
                  v-show="propertyType === 'classSettingsignleSelect'"
                >
                  <h3>속성값</h3>
                  <input
                    type="text"
                    v-model="attrValue"
                    placeholder="속성 값 입력 후 Enter"
                    @keydown.enter.stop="addAttributeValue(index)"
                  />
                  <div
                    v-show="categoryAttrItem.categoryAttrVal.length"
                    class="attribute-value align3"
                  >
                    <span
                      class="align2"
                      v-for="(
                        attribute, index
                      ) in categoryAttrItem.categoryAttrVal"
                      :key="attribute"
                      >{{ attribute }}
                      <button @click="deleteAttrValue(index)">
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
                    categoryAttrItem.categoryAttrType ===
                    'classSettingMultipleSelect'
                  "
                >
                  <div class="align0 attribute-inner">
                    <div>
                      <h3>최소 선택 수</h3>
                      <input type="number" v-model="categoryAttrItem.categoryAttrInputMin"/>
                    </div>
                    <div>
                      <h3>최대 선택 수</h3>
                      <input type="number" v-model="categoryAttrItem.categoryAttrInputMax"/>
                    </div>
                  </div>
                </div>
                <!-- 입력형 -->
                <div
                  class="attribute-inner"
                  v-show="
                    categoryAttrItem.categoryAttrType === 'classSettingInput'
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
                  <div class="attribute-inner">
                    <h3>글자입력 수</h3>
                    <div class="align4">
                      <input
                        type="number"
                        v-model="categoryAttrItem.categoryAttrLengthMin"
                      />
                      <span>~</span>
                      <input
                        type="number"
                        v-model="categoryAttrItem.categoryAttrLengthMax"
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li class="attribute-wrap align4 attribute-add">
                <b>추가하기</b>
                <img
                  @click="addAttribute(index)"
                  src="../../../../assets/images/project/icon/icon-add2.svg"
                  alt=""
                />
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
      <div class="button-align1" @click="submitForm()">
        <router-link
          :to="{
            name: 'allprojectlist',
            params: { projectName: this.projectName },
          }"
          class="btn-set btn2-1"
          >생성하기</router-link
        >
        <a href="all-project.html" class="btn-set btn1-1">취소</a>
      </div>
    </main>
    <!--    클래스 세부 설정-->
    <div class="project-popup-wrap" v-show="isPopUpOn">
      <ul class="project-popup1">
        <li class="project-popup-title align2">
          <h2>클래스 세부 설정</h2>
          <button @click="isPopUpOn = false">
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
                  <button>
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
                  <button>
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
                  <button>
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
            <button class="btn2-1">저장</button>
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
          <button class="btn2-1">확인</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import fs from 'fs';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import _ from 'lodash';
import axios from 'axios';

export default {
  components: { Datepicker },
  mounted() {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    this.collectCrawlingPeriodInput = [startDate, endDate];
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
      dataType: -1,
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
      collectCrawlingChannel: '', //수집채널
      collectCrawlingKeyword: '', //키워드
      collectCrawlingPeriod: '', //수집 기간
      collectCrawlingPeriodInput: '', //수집 기간-직접입력값
      collectCrawlingCount: '', //수집 건수
      collectCrawlingCountInput: '', //수집 건수-직접입력값
      // checkedValues: [],
      // isAllChecked: true,

      //1-2.데이터 정제/전처리
      isCleaningOn: true, //데이터 정제
      isPreprocessingOn: false, //데이터 전처리

      //1-2-1.영상/이미지 정제
      CleaningFunction: 'CleaningFunctionFrame',

      //1-2-2.이미지 전처리
      PreprocessingFunction: [],

      className: '',

      isPopUpOn: false, //클래스 세부 설정 팝업
      propertyType: 'classSettingsignleSelect',
      classSettingMultipleChoice: false,
      classSettingInput: false,

      categoryItems: [],
      categoryAttrsTemp: [],
      categoryItem: {
        categoryName: '',
        categoryParentId: Number,
        categoryColor: Number,
        categoryAttrItems: [],
      },
      categoryAttrItem: {
        categoryAttrName: '',
        categoryAttrDesc: '',
        categoryAttrType: '',
        categoryAttrVal: [],
        categoryAttrInputMin: 0,
        categoryAttrInputMax: 0,
        categoryAttrLengthMin: 0,
        categoryAttrLengthMax: 0,
      },
      categoryAttrItemOrigin: {
        categoryAttrName: '',
        categoryAttrDesc: '',
        categoryAttrType: '',
        categoryAttrVal: [],
        categoryAttrInputMin: 0,
        categoryAttrInputMax: 0,
        categoryAttrLengthMin: 0,
        categoryAttrLengthMax: 0,
      },
      isClassSelectOn: [],
      attributes: [],
      attrValue: '',
      projectWorkStep: '수집',
    };
  },
  computed: {
    isprojectNameValid() {
      //this.projectName.trim();
      return this.projectName.length < 1 || this.projectName.length > 50;
    },
    isprojectExplainValid() {
      return this.projectExplain.length < 1 || this.projectExplain.length > 100;
    },
    isCollectCrawlingKeywordValid() {
      return (
        this.collectCrawlingKeyword.length < 1 ||
        this.collectCrawlingKeyword.length > 10
      );
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
    textBoxVisible() {
      return !['100', '500', '1000', '2000', '3000'].includes(
        this.collectCrawlingCount,
      );
    },
    //데이터 수집 프로젝트 설정 - 데이터 유형
    collectOwnOnOff: function () {
      this.isCollectOwnOn = true;
      this.isCollectCrawlingOn = false;
      this.dataType = 0;
    },
    collectCrawlingOnOff: function () {
      this.isCollectOwnOn = false;
      this.isCollectCrawlingOn = true;
      this.dataType = 1;
    },
    //데이터 정제/전처리 프로젝트 설정 - 데이터 유형
    cleaningOnOff: function () {
      this.isCleaningOn = !this.isCleaningOn;
      this.isPreprocessingOn = false;
    },
    preprocessingOnOff: function () {
      this.isCleaningOn = false;
      this.isPreprocessingOn = !this.isPreprocessingOn;
    },

    classNameDelete(index) {
      this.categoryItems.splice(index, 1);
      this.categoryAttrsTemp.splice(index, 1);
      this.unselectAll();
    },
    isPopUpOnOff() {
      this.isPopUpOn = !this.isPopUpOn;
    },
    isClassSelectOnOff(index) {
      for (let index = 0; index < this.isClassSelectOn.length; index++) {
        this.isClassSelectOn[index] = false;
      }
      this.isClassSelectOn[index] = true;
      this.initClass(index);
      console.log(this.isClassSelectOn);
    },
    initClass(index) {
      this.categoryAttrItem = this.categoryAttrsTemp[index];
      this.attrValue = '';
    },
    async submitForm() {
      if (this.collectCrawlingPeriod === 'custom') {
        this.collectCrawlingPeriod = this.collectCrawlingPeriodInput;
      }
      if (this.collectCrawlingCount === 'countcustom') {
        this.collectCrawlingCount = this.collectCrawlingCountInput;
      }
      const ProjectCommonData = {
        projectName: this.projectName.trim(),
        projectExplain: this.projectExplain,
        projectType: this.projectType,
      };
      const CollectOwnData = {
        checkedCollectOwn: this.checkedCollectOwn,
      };
      const CollectCrawlingData = {
        collectCrawlingChannel: this.collectCrawlingChannel,
        collectCrawlingKeyword: this.collectCrawlingKeyword,
        collectCrawlingPeriod: this.collectCrawlingPeriod,
        collectCrawlingCount: this.collectCrawlingCount,
      };
      const CleaningData = {
        CleaningFunction: this.CleaningFunction,
      };
      const PreprocessingData = {
        PreprocessingFunction: this.PreprocessingFunction,
      };

      console.log(ProjectCommonData);
      console.log(CollectOwnData);
      console.log(CollectCrawlingData);
      console.log(CleaningData);
      console.log(PreprocessingData);
      alert('프로젝트가 생성되었습니다.');

      //TODO: requestBody 데이터 추가
      await axios.post('/rest/api/1/project/create', {
        project_name: this.projectName,
        project_desc: this.projectExplain,
        project_type: this.projectType,
      });

      await this.$router.push({
        name: 'allprojectlist',
      });
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
    clickFunc() {
      console.log(this.checkedCollectOwn);
    },
    unselectAll: function () {
      for (let i = 0; i < this.isClassSelectOn.length; i++) {
        this.isClassSelectOn[i] = false;
      }
    },
    addCate: function () {
      this.unselectAll();
      let categoryItem = _.cloneDeep(this.categoryItem);
      this.categoryItems.push(categoryItem);
      this.categoryAttrsTemp.push(_.cloneDeep(this.categoryAttrItemOrigin));
      this.categoryItem.categoryName = '';
    },
    allCheck(checked) {
      this.isAllChecked = checked;
      for (let i in this.collectOwnListItem) {
        this.collectOwnListItem[i].selected = this.isAllChecked;
      }
    },
    addAttributeValue(index) {
      this.categoryAttrItem.categoryAttrVal.push(this.attrValue);
      this.categoryAttrsTemp[index] = _.cloneDeep(this.categoryAttrItem);
      this.attrValue = '';
    },
    deleteAttrValue(index) {
      this.categoryAttrItem.categoryAttrVal.splice(index, 1);
      this.categoryAttrsTemp[index] = _.cloneDeep(this.categoryAttrItem);
    },
    addAttribute(index) {
      this.categoryAttrsTemp[index] = _.cloneDeep(this.categoryAttrItem);
      this.categoryItems[index].categoryAttrItems.push(
        this.categoryAttrsTemp[index],
      );
      console.log(this.categoryItems);
      this.categoryAttrsTemp[index] = _.cloneDeep(this.categoryAttrItemOrigin);
      this.categoryAttrItem = _.cloneDeep(this.categoryAttrItemOrigin);
      this.attrValue = '';
    },
  },
};
</script>

<style></style>
