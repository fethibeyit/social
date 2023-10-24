import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {FileModel} from "../models/fileModel.interface";
import {AppFile} from "./file-actions";
import {UploadService} from "../services/upload.service";
import {FileUploadModel} from "../models/fileUploadModel.interface";


export interface FileStateModel {
  filesToUpload: ReadonlyArray<FileUploadModel>;
  uploadedFiles: ReadonlyArray<FileModel>;
  loading : boolean;
  selected : FileUploadModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<FileStateModel>;

@State<FileStateModel>({
  name: 'Files',
  defaults: {
    filesToUpload: [],
    uploadedFiles : [],
    loading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class FileState {
  constructor(private uploadService: UploadService) {}

  @Selector()
  static filesToUpload(state: FileStateModel): readonly FileUploadModel[] {
    return state.filesToUpload.filter(f=> !f.uploaded);
  }

  @Selector()
  static uploadedFiles(state: FileStateModel): readonly FileModel[] {
    return state.uploadedFiles;
  }

  @Selector()
  static selectedFile(state: FileStateModel): FileUploadModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: FileStateModel): boolean {
    return state.loading;
  }

  @Action(AppFile.AddFile)
  protected async addFile(ctx: LocalStateContext, action: AppFile.AddFile): Promise<void> {
    const { file } = action;
    ctx.patchState({filesToUpload :  [...ctx.getState().filesToUpload, file]})
  }

  @Action(AppFile.RemoveFile)
  protected async removeFile(ctx: LocalStateContext, action: AppFile.RemoveFile): Promise<void> {
    const { file } = action;
    ctx.patchState({filesToUpload : ctx.getState().filesToUpload.filter(x => x.id != file.id)})
  }

  @Action(AppFile.Upload)
  protected async uploadFile(ctx: LocalStateContext, action: AppFile.Upload): Promise<void> {
    const { file } = action;
    if(file.file && !file.uploaded) {
      ctx.patchState({loading: true})
      try {
        const data = await this.uploadService.upload(file.file).toPromise();
        if (data) ctx.patchState({
          uploadedFiles: [...ctx.getState().uploadedFiles, data],
          filesToUpload: ctx.getState().filesToUpload.map(x => x.id == file.id ? {...x, uploaded: true} : x)
        });
      } finally {
        ctx.patchState({loading: false})
      }
    }
  }

  @Action(AppFile.UploadAll)
  protected async uploadAllFiles(ctx: LocalStateContext, action: AppFile.UploadAll): Promise<void> {
    ctx.getState().filesToUpload.filter(f => !f.uploaded && f.file).forEach(f => {
      ctx.dispatch(new AppFile.Upload(f));
    });
}

  @Action(AppFile.Clear)
  protected async clearFiles(ctx: LocalStateContext, action: AppFile.Clear): Promise<void> {
    ctx.patchState({filesToUpload : []})
  }

}
