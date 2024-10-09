import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {FileModel} from "../models/fileModel.interface";
import {AppFile} from "./file-actions";
import {FileService} from "../services/file.service";
import {FileUploadModel} from "../models/fileUploadModel.interface";
import {Guid} from "guid-typescript";


export interface FileStateModel {
  filesData: ReadonlyArray<FileUploadModel>;
  filesMetadata: ReadonlyArray<FileModel>;
  imagesUrl: Map<string, string>;
  loading : boolean;
  error: string | null;
}

type LocalStateContext = StateContext<FileStateModel>;

@State<FileStateModel>({
  name: 'Files',
  defaults: {
    filesData: [],
    filesMetadata : [],
    imagesUrl : new Map<string, string>(),
    loading: false,
    error: null,
  },
})
@Injectable()
export class FileState {
  constructor(private fileService: FileService) {}

  @Selector()
  static filesData(state: FileStateModel): readonly FileUploadModel[] {
    return state.filesData;
  }

  @Selector()
  static filesMetadata(state: FileStateModel): readonly FileModel[] {
    return state.filesMetadata;
  }

  @Selector()
  static imagesUrl(state: FileStateModel): Map<string, string> {
    return state.imagesUrl;
  }

  @Selector()
  static loading(state: FileStateModel): boolean {
    return state.loading;
  }

  @Action(AppFile.AddFile)
  protected async addFile(ctx: LocalStateContext, action: AppFile.AddFile): Promise<void> {
    const { file } = action;
    const url = Guid.create().toString();
    const fileData : FileUploadModel = {
      url :  url,
      file : file,
      src : URL.createObjectURL(file)
    }
    const fileMetadata : FileModel = {
      name : file.name,
      type : file.type,
      url : url
    }
    ctx.patchState({filesData :  [...ctx.getState().filesData, fileData],
      filesMetadata :  [...ctx.getState().filesMetadata, fileMetadata]})
  }

  @Action(AppFile.RemoveFile)
  protected async removeFile(ctx: LocalStateContext, action: AppFile.RemoveFile): Promise<void> {
    const { url } = action;
    ctx.patchState({filesData : ctx.getState().filesData.filter(x => x.url != url),
      filesMetadata : ctx.getState().filesMetadata.filter(x => x.url != url)})
  }

  @Action(AppFile.RemoveAllFiles)
  protected async removeAllFiles(ctx: LocalStateContext, action: AppFile.RemoveAllFiles): Promise<void> {
    ctx.patchState({filesData : [], filesMetadata : []})
  }

  @Action(AppFile.Upload)
  protected async uploadFile(ctx: LocalStateContext, action: AppFile.Upload): Promise<void> {
    const { file } = action;
      ctx.patchState({loading: true})
      try {
        const data = await this.fileService.upload(file).toPromise();
        if (data) ctx.patchState({filesData : ctx.getState().filesData.filter(x => x.url != data.url)});
      } finally {
        ctx.patchState({loading: false})
      }
  }

  @Action(AppFile.CreateImageUrl)
  protected async createImageUrl(ctx: LocalStateContext, action: AppFile.CreateImageUrl): Promise<void> {
    const { file } = action;
    ctx.patchState({loading: true})
    try {
      const image = await this.fileService.download(file.url).toPromise();
      if (image) {
        const imageUrl = URL.createObjectURL(image);
        ctx.patchState({imagesUrl : ctx.getState().imagesUrl.set(file.url, imageUrl)});
      }
    } finally {
      ctx.patchState({loading: false})
    }
  }

  @Action(AppFile.UploadAll)
  protected async uploadAllFiles(ctx: LocalStateContext): Promise<void> {
    ctx.dispatch(ctx.getState().filesData.map(f => new AppFile.Upload(f)));
}

  @Action(AppFile.ClearMetadata)
  protected async clearFiles(ctx: LocalStateContext, action: AppFile.ClearMetadata): Promise<void> {
    ctx.patchState({filesMetadata : []})
  }

}
