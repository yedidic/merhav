<template>
  <tr class="expand-table-line">
    <td class="cell">{{formattedDate}}</td>
    <td>
      <span
        :class="[
            'avg-display', 'cell',
            sub.avg < 3 && sub.avg > 0? 'danger':'',
            sub.avg > 4? 'success': ''
        ]"
      >{{sub.avg.toFixed(2)}}</span>
    </td>
    <td class="cell">
      <div :class="['diff-container','ltr', 
            'avg-display',
            changePrecent < 0 ?'danger':'',
            changePrecent > 0? 'success': ''
        ]"
      >
        <span class="sign">{{signByChangePrecent}}</span>
        <span class="change-precent-display">{{formattedPrecent}}</span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    sub: Object,
    changePrecent: [Number, String]
  },
  computed: {
    formattedDate() {
      return this.moment(this.sub.at).format("DD/MM/YY");
    },
    formattedPrecent() {
      return Math.abs(this.changePrecent).toFixed(2) + "%";
    },
    signByChangePrecent() {
      if (this.changePrecent > 0) return "+";
      if (this.changePrecent < 0) return "-";
      return " ";
    }
  }
};
</script>

<style lang="scss" scoped>
.expand-table-line {
  cursor: pointer;
}

.diff-container {
    width:fit-content;
    margin: 0 auto;
}
</style>
