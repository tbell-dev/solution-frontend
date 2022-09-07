<template>
  <section>
    <article>
      <ul class="search-filter">
        <li class="search-title">
          <h2>검색일</h2>
        </li>
        <li class="search-contents">
          <button
            @click="Period_2_Week"
            class="btn1-1"
            :class="{
              'btn1-active': this.period === '2W',
            }"
          >
            <span>14일</span>
          </button>
          <button
            @click="Period_1_Month"
            class="btn1-1"
            :class="{
              'btn1-active': this.period === '1M',
            }"
          >
            <span>1개월</span>
          </button>
          <button
            @click="Period_3_Month"
            class="btn1-1"
            :class="{
              'btn1-active': this.period === '3M',
            }"
          >
            <span>3개월</span>
          </button>
          <button
            @click="Period_6_Month"
            class="btn1-1"
            :class="{
              'btn1-active': this.period === '6M',
            }"
          >
            <span>6개월</span>
          </button>
          <button
            @click="Period_Custom"
            class="btn1-1"
            :class="{
              'btn1-active': this.period === 'custom',
            }"
          >
            <span>직접입력</span>
          </button>
          <Datepicker
            v-model="date"
            v-show="this.period === 'custom'"
            range
            multiCalendars
            :enableTimePicker="false"
          />
        </li>
      </ul>
      <ul class="search-filter">
        <li class="search-title">
          <h2>검색어</h2>
        </li>
        <li class="search-contents">
          <input
            type="search"
            maxlength="70"
            v-model="searchKeyword"
            placeholder="프로젝트명을 입력해주세요."
          />
          <button class="btn2-1" @click="$emit('loadProjects', searchKeyword)">
            검색
          </button>
        </li>
      </ul>
    </article>
  </section>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';

export default {
  name: 'NewComponent',
  components: { Datepicker },
  props: {
    loadProjects: Function,
  },
  data() {
    return {
      searchKeyword: '',
      period: '2W',
    };
  },
  methods: {
    Period_2_Week() {
      this.period = '2W';
    },
    Period_1_Month() {
      this.period = '1M';
    },
    Period_3_Month() {
      this.period = '3M';
    },
    Period_6_Month() {
      this.period = '6M';
    },
    Period_Custom() {
      this.period = 'custom';
    },
  },
};
</script>
