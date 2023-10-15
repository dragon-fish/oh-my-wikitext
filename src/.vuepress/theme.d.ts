export interface PlaygroundCodeConfig {
  /**
   * 代码块扩展名
   *
   * @description 它基于文件名，而不是代码块语言
   */
  ext: string

  /**
   * 代码块内容
   */
  content: string
}

export interface PlaygroundData {
  /**
   * 交互演示标题
   */
  title?: string

  /**
   * Import map 文件名
   *
   * @default 'import-map.json'
   */
  importMap?: string

  /**
   * 交互演示件信息
   */
  files: Record<
    /**
     * 文件名
     */
    string,
    /**
     * 文件详情
     */
    PlaygroundCodeConfig
  >

  /**
   * 交互演示设置
   *
   * @description 它是设置指令后的 json 内容的解析结果
   */
  settings: Record<string, unknown>

  /**
   * 根据交互演示内容生成的 hash key
   */
  key: string
}

export interface PlaygroundOptions {
  /**
   * 交互演示容器名
   */
  name: string

  /**
   * 交互演示组件名称
   *
   * @default 'Playground'
   */
  component?: string

  /**
   * 属性获取器
   */
  propsGetter: (data: PlaygroundData) => Record<string, string>
}

export const PlaygroundCodeConfig: PlaygroundCodeConfig
export const PlaygroundData: PlaygroundData
export const PlaygroundOptions: PlaygroundOptions
