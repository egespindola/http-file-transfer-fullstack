<template>
  <div id="app">
    <div class="header"></div>
    <div class="div-message" v-if="opMsg">
        <span>{{opMsg}}</span>
    </div>
    <div class="container">
      <div class="main-content">
          <div class="ipt-grp">
            <div id="ipt-download"  class="bdr-bt mb">
              <h3>🔥Download a file</h3>
              <label for="ipt-txt" title="a text...">Path: </label>
              <input type="text" name="ipt-txt"  v-model="path" />
              <br>
              <br>
              Path: <strong>{{path}} </strong> <br>
              File: <strong>{{ fileNameDown}}</strong>
              <br><br>
            </div>
            <div id="ipt-mkdir" class="bdr-bt mb">
              <h3>🔥Create a dir</h3>
              <label for="ipt-txt-mkdir" title="Directory Name">Dir Name: </label>
              <input type="text" name="ipt-dirName"  v-model="dirName"  placeholder="new directory name"/>
              <button type="button" title="Create a new dir in remote srv" @click="handleCreateDir">Create</button>
              <br>
              Path: <strong>/C/Workspace/develop/filetransf-http/files/{{dirName}} </strong> <br>              
              <br><br>
            </div>
            <div id="ipt-upload" class="bdr-bt mb">
              <h3>🔥Upload files</h3>
              <anexos-arquivos></anexos-arquivos>
              <button type="button" title="Upload files" @click="handleUploadFiles">Upload</button><br>
              <small>Path: 'C:/Workspace/develop/filetransf-http/files/upload'</small>
            </div>
            <div id="ipt-get-tst" class="bdr-bt mb">
              <h3>🔥Get tst</h3>
              <button type="button" title="Get test" @click="handleGetTst">Run</button>
            </div>
          </div>

          <div class="grt-pipe"></div>

          <div class="grp-list">
            <button @click="handleList">List</button>
            <div class="loadMsg" v-if="load">{{msgLoading}}</div>
            <div>
              <draggable v-model="fileList" group="files" @start="drag=true" @end="drag=false">
                <div class="div-list" v-for="(file,ix) in fileList" :key="ix" @click="handleDownload(file)">
                  {{file.originalname}}
                  <div class="div-downfile"></div>
                </div>
              </draggable>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import AnexosArquivos from '@/components/AnexosArquivos.vue'
import bus from '@/bus.js'

export default {
  name: 'App',
  components: {draggable, AnexosArquivos},
  data(){
    return {
      fileList: [],   /* files in Vol */
      filesList: [],   /* files in attachmets */
      load: false,
      path: 'C:/Workspace/develop/',
      dirName: '',
      fileNameDown: '',
      msgLoading: 'Loading . . .',
      opMsg: '',
    }
  },
  created() {
      console.log('created')
      bus.$on('setFileList', data => {
        this.filesList = data
      })
  },
  methods:{
    async handleUploadFiles(){
      console.log("Uploading...")
      console.log(this.filesList)
      let formData = new FormData();
      // formData.append("files",this.filesList)
      for (let i = 0; i < this.filesList.length; i++) {
        formData.append('files', this.filesList[i]);
      }

      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      };

        const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/files',
        timeout: 100000,
        header: headers,
      })
      let files = formData
      await AXIOS.post('/multiple', files).then(res => {
        console.log('upado')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    },
    async handleList(){
      this.load = true;
       axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

        const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/files/listAll',
        timeout: 100000,
        header: headers
      })

      await AXIOS.get().then(res => {
        console.log(res.data)
        this.fileList = res.data;
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        console.log("Finished")
        this.load = false;
      })

    },

    async handleDownload(file) {
      console.log('Download', file.filename)
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

        const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/files',
        timeout: 100000,
        header: headers
      })

      await AXIOS.get(`/${file.filename}`,{ responseType: 'blob'})
        .then(res => {
          console.log(res.data)
          let fileURL = window.URL.createObjectURL(new Blob([res.data]));
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', `${file.originalname}`);
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(err => {          
          console.log(err);
        })
        .then(() => {
          console.log("finished")
          this.load = false;
        });
    },

    async handleCreateDir(){
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const dirName = this.dirName
      const headers = {
        'Content-Type': 'application/json,  charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };

        const AXIOS = axios.create({
        baseURL: 'http://localhost:8000/files',
        timeout: 100000,
        header: headers,
      })

      await AXIOS.post('/mkdir', {dirName}).then(res => {
        console.log(res)
        this.opMsg = res.data            
        setTimeout(() => {
          this.opMsg = ''
        }, 3000);
      }).catch(err => {
        console.log(err)
        this.opMsg = err            
        setTimeout(() => {
          this.opMsg = ''
        }, 3000);
      })
    },

    async handleGetTst(){
      console.log('handling')
      // bus.$on('setFileList', data => {
      //   console.log('bus running..')
      //   this.filesList = data
      // })
      // bus.onSetFileList('updFilesList', data => {
      //   this.filesList = data
      //   console.log('bus running..')
      // })
      console.log(this.filesList)
      // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      // };

      //   const AXIOS = axios.create({
      //   baseURL: 'http://localhost:8000/files',
      //   timeout: 100000,
      //   header: headers
      // })

      // await AXIOS.get('',{ responseType: 'blob' })
      //   .then(res => {
      //     console.log(res.data)
      //     let fileURL = window.URL.createObjectURL(new Blob([res.data]));
      //     let fileLink = document.createElement('a');
      //     fileLink.href = fileURL;
      //     fileLink.setAttribute('download', `${'filename_changethis.pdf'}`);
      //     document.body.appendChild(fileLink);
      //     fileLink.click();
      //   })
      //   .catch(err => {          
      //     console.log(err);
      //   })
      //   .then(() => {
      //     console.log("finished")
      //     this.load = false;
      //   });
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  margin-bottom: 16px;
  background: linear-gradient(to right, black 0%, darkblue 25%, blue 50%, lightblue 75%, white 100%);
}

.container {
  padding: 16px;
  height: 100vw;
  width: 100%;
  border: 1px solid black;
}

.main-content {
  height: 100%;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  
}

.ipt-grp, .grp-list{
  height: 100%;
  width: 50%;
  border: 1px solid linear-gradient(to right,#333, #333 50%, #eee 75%, #333 75%);
}

.ipt-grp{
  /* background-color: red; */  
  margin-right: 8px;
}

.grp-list {
  /* background-color: yellow; */
  margin-left: 8px;
}

.grt-pipe{
  width: 1px;
  height: 100%;
  background: linear-gradient(black 0%, darkblue 15%, blue 35%, lightblue 55%, white 100%);
}

.loadMsg {
  margin-top: 24px;
}

.div-list {
  display: flex;
  justify-content: space-between;

  border: 1px solid #414141;
  border-radius: 5px;
  background: linear-gradient(90deg, rgba(51,0,153,0.2766281512605042) 0%, rgba(0,51,255,0.5671043417366946) 59%,rgba(0,102,255,0.6671043417366946) 89%);
  
  /* background: linear-gradient(to right, black 0%, darkblue 15%, blue 35%, lightblue 55%, white 100%); */
  /* background: linear-gradient(#e66465, #9198e5); rgba(51,0,153,0.2) (*/ 
  color: #414141;
  font-weight: 900;

  padding: 8px;
  margin: 8px;
}

.div-downfile{
  width: 16px;
  height: 16px;
  border-radius: 2px 2px 16px 16px;
  background-color: #fff;
}

.div-message {
  background-color: green;
  color: white;
}

.bdr-bt {
  border-bottom: 1px solid #414141;
}

.mb {
  margin-bottom: 8px;
}

#ipt-upload{
  padding-bottom: 6px;
}

button {
  margin-left: 4px;
  border-radius: 6px;
  border: 2px solid #05db18;
  color: #fff;
  background-color: darkcyan;
  padding: 2px 16px; 
}

</style>
