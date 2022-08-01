<template>
  <div class="container d-flex justify-content-center">
    <div class="d-flex flex-column col-sm-6">
      <h1 class="d-flex justify-content-center">Todos</h1>
      <div class="mb-6 row">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <input type="text" v-model="todosForm.newTodo.value" placeholder="" class="form-control">
            <button class="btn btn-success" :disabled="!todosForm.newTodo.value || todosForm.newTodo.hasError('minLength')" @click="addTodo()">Add</button>
          </div>
          <div class="invalid-feedback" style="display: block" v-if="todosForm.newTodo.hasError('minLength')">
            Minimum length 10 characters without spaces
          </div>
          <div class="invalid-feedback" style="display: block" v-if="todosForm.newTodo.hasError('required')">
            Required name
          </div>
        </div>
      </div>

      <template v-for="(row, index) in todosForm.todoList.controls" :key="index">
        <hr/>
        <div class="mb-6 mp-6 row">
          <div class="d-flex">
            <div class="d-flex justify-content-center align-items-center m-1">
              <input class="form-check-input" type="checkbox" v-model="row.done.value">
            </div>
            <input type="text" :disabled="row.done.value" v-model="row.text.value" class="form-control">
            <div class="d-flex justify-content-center align-items-center m-1">
              <button class="btn btn-success" @click="removeControl(index)">Remove</button>
            </div>
          </div>
        </div>
      </template>


    </div>

    <div class="d-flex flex-column col-sm-6" style="padding-left: 50px;font-weight: 600;">
      <h1 class="d-flex justify-content-center">Value</h1>
      <div class="mb-6 row">
        <pre>{{ todosForm.value }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ReactiveForm, FormControl, FormGroup, FormArray, Validators } from 'reactive-vue-form'
import { ref } from 'vue';

  const todosForm = new ReactiveForm({
    newTodo: new FormControl('', [Validators.minLength(10), Validators.required]),
    todoList: new FormArray([])
  });
  const todoText = ref(null);


  function addTodo() {
    (todosForm.get("todoList") as FormArray).setControls([
      new FormGroup({
        done: new FormControl(false),
        text: new FormControl(todosForm.get("newTodo").value),
      })
    ]);
    todosForm.get("newTodo").setValue(null);
  }

  function removeControl(index: any) {
    todosForm.removeControl(index);
    console.log(todosForm)
  }

  function setValue() {
    todosForm.get("0").setValue({ done: true, text: 'dynamic text' })
  }

</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css'
</style>


