<template>
  <div class="container pt-2" >
    <hr>
    <h1 style="color: #ee6e73;font-weight: 300;">FormGroup</h1>
    <hr>
    <div class="d-flex">
      <input class="form-control mb-3" :class="{ 'is-invalid': group.get('one').errors }"  type="text" v-model="group.get('one').value">
    </div>
    <button class="btn btn-success" :disabled="!group.get('one').value"  @click="addToList()">add to list</button>
    <div class="d-flex  pt-2">
      <ul class="list-group w-100">
        <li v-for="(control, index) in group.get('list').controls" :key="index">
          <div class="d-flex">
            <div class="col-md-12">
              <input placeholder="Required value" class="form-control mb-3" :class="{ 'is-invalid': control.errors }"  type="text" v-model="control.value">
              <p class="mb-3" style="color: #dc3545;" v-if="control.hasError('required')">required value</p>
            </div>
           <div>
             <button class="btn btn-danger" @click="remove(index)">remove</button>
           </div>
          </div>
        </li>
      </ul>
    </div>
    <p class="mb-3" style="color: #dc3545;" v-if="group.get('list').hasError('length')">
      {{ group.get('list').errors.length }}
    </p>

    <div class="pt-3">
      <highlightjs language='javascript' :code="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "reactive-vue-form";

  const code = `
    const group = new FormGroup({
      one: new FormControl(),
      list: new FormArray([], [childsCount]),
    });

    function childsCount(group: AbstractControl) {
      if ((group as FormArray).controls.length < 5) {
        return { length: "need 5 childs" }
      }
      return null;
    }

    function addToList() {
      (group.get("list") as FormArray).addControls([
        new FormControl(group.get("one").value, [Validators.required]),
      ]);
      group.get("one").setValue('');
      console.log(group);
    }


    function remove(index: number) {
      (group.get("list") as FormArray).removeAt(index);
    }
  `

  const group = new FormGroup({
    one: new FormControl(),
    list: new FormArray([], [childsCount]),
  });

  function childsCount(group: AbstractControl) {
    if ((group as FormArray).controls.length < 5) {
      return { length: "need 5 childs" }
    }
    return null;
  }

  function addToList() {
    (group.get("list") as FormArray).addControls([
      new FormControl(group.get("one").value, [Validators.required]),
    ]);
    group.get("one").setValue('');
    console.log(group);
  }


  function remove(index: number) {
    (group.get("list") as FormArray).removeAt(index);
  }


</script>

<style>

</style>
