<template>
  <section class="students-accordion">
    <div class="accordion-container flex-col">
      <student-preview 
        v-for="student in students" 
        :key="student._id" 
        :student="student"></student-preview>
    </div>
  </section>
</template>

<script>
import StudentPreview from "@/components/Teacher/accordion/StudentPreview.vue";

export default {
  props: {
    students: Array
  },
  components: {
    StudentPreview
  }
};
</script>

<style>
</style>
