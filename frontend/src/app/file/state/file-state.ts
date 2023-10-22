import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {FileModel} from "../models/fileModel.interface";
import {AppFile} from "./file-actions";
import {UploadService} from "../services/upload.service";


export interface FileStateModel {
  files: ReadonlyArray<FileModel>;
  loading : boolean;
  selected : FileModel | null;
  error: string | null;
}

type LocalStateContext = StateContext<FileStateModel>;

@State<FileStateModel>({
  name: 'Files',
  defaults: {
    files: [],
    loading: false,
    selected : null,
    error: null,
  },
})
@Injectable()
export class FileState {
  constructor(private uploadService: UploadService) {}

  @Selector()
  static Files(state: FileStateModel): readonly FileModel[] {
    return state.files;
  }

  @Selector()
  static selectedFile(state: FileStateModel): FileModel | null {
    return state.selected;
  }

  @Selector()
  static loading(state: FileStateModel): boolean {
    return state.loading;
  }

  @Action(AppFile.Upload)
  protected async uploadFile(ctx: LocalStateContext, action: AppFile.Upload): Promise<void> {
    const { file } = action;
    ctx.patchState({loading: true})
    try{
      const data = await this.uploadService.upload(file).toPromise();
      if (data) ctx.patchState( {files : [...ctx.getState().files, data]});
    }finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(AppFile.Clear)
  protected async clearFiles(ctx: LocalStateContext, action: AppFile.Clear): Promise<void> {
    ctx.patchState({files : []})
  }

}
