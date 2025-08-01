import { DesignerToolbarSettings } from "@/index";
import { nanoid } from "@/utils/uuid";
import { FormLayout } from "antd/lib/form/Form";
import { getBorderInputs, getCornerInputs } from "../_settings/utils/border/utils";
import { positionOptions, repeatOptions, sizeOptions } from "../_settings/utils/background/utils";

export const getSettings = (data: any) => {
  const searchableTabsId = nanoid();
  const commonTabId = nanoid();
  const dataTabId = nanoid();
  const appearanceId = nanoid();
  const securityId = nanoid();
  const styleRouterId = nanoid();
  const dimensionsStylePnlId = nanoid();
  const borderStylePnlId = nanoid();
  const backgroundStylePnlId = nanoid();

  const propertyNameId = nanoid();
  const shadowStylePnlId = nanoid();

  return {
    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: searchableTabsId,
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: 'common',
            title: 'Common',
            id: commonTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: propertyNameId,
                  propertyName: "componentName",
                  inputType: 'textField',
                  parentId: commonTabId,
                  label: "Component Name",
                  size: "small",
                  validate: {
                    "required": true
                  },
                })
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'hidden',
                  label: 'Hide',
                  labelAlign: 'right',
                  parentId: appearanceId,
                  inputType: 'switch',
                  size: 'small',
                  jsSetting: true,
                })
                .toJson()
            ]
          },
          {
            key: 'data',
            title: 'Data',
            id: dataTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({

                  id: nanoid(),
                  inputType: 'columnsList',
                  propertyName: 'columns',
                  label: 'Columns',
                  labelAlign: 'right',
                  tooltip: 'Configure columns',
                  parentId: dataTabId,
                  size: 'small',
                })
                .toJson()
            ]
          },
          {
            key: 'appearance',
            title: 'Appearance',
            id: appearanceId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: appearanceId,
                  inline: true,
                  inputs: [
                    {
                      type: 'numberField',
                      id: nanoid(),
                      propertyName: 'gutterX',
                      label: 'Gutter X',
                      labelAlign: 'right',
                      jsSetting: true,
                      min: 0,
                    },
                    {
                      type: 'numberField',
                      id: nanoid(),
                      propertyName: 'gutterY',
                      label: 'Gutter Y',
                      labelAlign: 'right',
                      jsSetting: true,
                      min: 0,
                    },
                  ]
                })
                .addPropertyRouter({
                  id: styleRouterId,
                  propertyName: 'propertyRouter1',
                  componentName: 'propertyRouter',
                  label: 'Property router1',
                  labelAlign: 'right',
                  parentId: appearanceId,
                  hidden: false,
                  propertyRouteName: {
                    _mode: "code",
                    _code: "    return contexts.canvasContext?.designerDevice || 'desktop';",
                    _value: ""
                  },
                  components: [
                    ...new DesignerToolbarSettings()
                      .addCollapsiblePanel({
                        id: 'dimensionsStyleCollapsiblePanel',
                        propertyName: 'pnlDimensions',
                        label: 'Dimensions',
                        parentId: styleRouterId,
                        labelAlign: 'right',
                        ghost: true,
                        collapsible: 'header',
                        content: {
                          id: dimensionsStylePnlId,
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: dimensionsStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'textField',
                                  id: `width-${styleRouterId}`,
                                  label: "Width",
                                  width: 85,
                                  propertyName: "dimensions.width",
                                  icon: "widthIcon",
                                  tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                                },
                                {
                                  type: 'textField',
                                  id: `minWidth-${styleRouterId}`,
                                  label: "Min Width",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.minWidth",
                                  icon: "minWidthIcon",
                                },
                                {
                                  type: 'textField',
                                  id: `maxWidth-${styleRouterId}`,
                                  label: "Max Width",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.maxWidth",
                                  icon: "maxWidthIcon",
                                }
                              ]
                            })
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: dimensionsStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'textField',
                                  id: `height-${dimensionsStylePnlId}`,
                                  label: "Height",
                                  width: 85,
                                  propertyName: "dimensions.height",
                                  icon: "heightIcon",
                                  tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                                },
                                {
                                  type: 'textField',
                                  id: `minHeight-${dimensionsStylePnlId}`,
                                  label: "Min Height",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.minHeight",
                                  icon: "minHeightIcon",
                                },
                                {
                                  type: 'textField',
                                  id: `maxHeight-${dimensionsStylePnlId}`,
                                  label: "Max Height",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.maxHeight",
                                  icon: "maxHeightIcon",
                                }
                              ]
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlBorderStyle',
                        label: 'Border',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: borderStylePnlId,
                          components: [...new DesignerToolbarSettings()

                            .addContainer({
                              id: 'borderStyleRow',
                              parentId: 'borderStylePnl',
                              components: getBorderInputs() as any
                            })
                            .addContainer({
                              id: 'borderRadiusStyleRow',
                              parentId: 'borderStylePnl',
                              components: getCornerInputs() as any
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlBackgroundStyle',
                        label: 'Background',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: backgroundStylePnlId,
                          components: [
                            ...new DesignerToolbarSettings()
                              .addSettingsInput({
                                id: `${backgroundStylePnlId}-type`,
                                parentId: backgroundStylePnlId,
                                label: "Type",
                                jsSetting: false,
                                propertyName: "background.type",
                                inputType: "radio",
                                tooltip: "Select a type of background",
                                buttonGroupOptions: [
                                  {
                                    value: "color",
                                    icon: "FormatPainterOutlined",
                                    title: "Color"
                                  },
                                  {
                                    value: "gradient",
                                    icon: "BgColorsOutlined",
                                    title: "Gradient"
                                  },
                                  {
                                    value: "image",
                                    icon: "PictureOutlined",
                                    title: "Image"
                                  },
                                  {
                                    value: "url",
                                    icon: "LinkOutlined",
                                    title: "URL"
                                  },
                                  {
                                    value: "storedFile",
                                    icon: "DatabaseOutlined",
                                    title: "Stored File"
                                  }
                                ],
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-color`,
                                parentId: backgroundStylePnlId,
                                inputs: [{
                                  type: 'colorPicker',
                                  id: nanoid(),
                                  label: "Color",
                                  propertyName: "background.color",
                                  hideLabel: true,
                                  jsSetting: false,
                                }],
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-gradient`,
                                parentId: backgroundStylePnlId,
                                inputs: [{
                                  type: 'multiColorPicker',
                                  id: nanoid(),
                                  propertyName: "background.gradient.colors",
                                  label: "Colors",
                                  jsSetting: false,
                                }
                                ],
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                                hideLabel: true,
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-url`,
                                parentId: backgroundStylePnlId,
                                inputs: [{
                                  type: 'textField',
                                  id: nanoid(),
                                  propertyName: "background.url",
                                  jsSetting: false,
                                  label: "URL",
                                }],
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-image`,
                                parentId: backgroundStylePnlId,
                                inputs: [{
                                  type: 'imageUploader',
                                  id: 'backgroundStyle-image',
                                  propertyName: 'background.uploadFile',
                                  label: "Image",
                                  jsSetting: false,
                                }],
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-storedFile`,
                                parentId: backgroundStylePnlId,
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                                inputs: [
                                  {
                                    type: 'textField',
                                    id: 'backgroundStyle-storedFile',
                                    jsSetting: false,
                                    propertyName: "background.storedFile.id",
                                    label: "File ID"
                                  }
                                ]
                              })
                              .addSettingsInputRow({
                                id: `${backgroundStylePnlId}-controls`,
                                parentId: backgroundStylePnlId,
                                inline: true,
                                hidden: { _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                                inputs: [
                                  {
                                    type: 'customDropdown',
                                    id: nanoid(),
                                    label: "Size",
                                    hideLabel: true,
                                    propertyName: "background.size",
                                    dropdownOptions: sizeOptions,
                                  },
                                  {
                                    type: 'customDropdown',
                                    id: nanoid(),
                                    label: "Position",
                                    hideLabel: true,
                                    propertyName: "background.position",
                                    dropdownOptions: positionOptions,
                                  }
                                ]
                              })
                              .addSettingsInputRow({
                                id: 'backgroundStyleRow-repeat',
                                parentId: 'backgroundStyleRow',
                                inputs: [{
                                  type: 'radio',
                                  id: 'backgroundStyleRow-repeat-radio',
                                  label: 'Repeat',
                                  hideLabel: true,
                                  propertyName: 'background.repeat',
                                  inputType: 'radio',
                                  buttonGroupOptions: repeatOptions,
                                }],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                              })
                              .toJson()
                          ],
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlShadowStyle',
                        label: 'Shadow',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: shadowStylePnlId,
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: shadowStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Offset X',
                                  hideLabel: true,
                                  width: 80,
                                  icon: "offsetHorizontalIcon",
                                  propertyName: 'shadow.offsetX',
                                  tooltip: 'OffsetX. The larger the value, the bigger the shadow',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Offset Y',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'offsetVerticalIcon',
                                  propertyName: 'shadow.offsetY',
                                  description: 'OffsetY. The larger the value, the bigger the shadow',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Blur',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'blurIcon',
                                  propertyName: 'shadow.blurRadius',
                                  description: 'Blur. The larger the value, the bigger the blur',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Spread',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'spreadIcon',
                                  propertyName: 'shadow.spreadRadius',
                                  description: 'Spread. The larger the value, the bigger the spread',
                                },
                                {
                                  type: 'colorPicker',
                                  id: nanoid(),
                                  label: 'Color',
                                  hideLabel: true,
                                  propertyName: 'shadow.color',
                                },
                              ],
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'stylingBox',
                        label: 'Margin & Padding',
                        labelAlign: 'right',
                        ghost: true,
                        collapsible: 'header',
                        content: {
                          id: nanoid(),
                          components: [...new DesignerToolbarSettings()
                            .addStyleBox({
                              id: nanoid(),
                              label: 'Margin Padding',
                              hideLabel: true,
                              propertyName: 'stylingBox',
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'style',
                        label: 'Custom Styles',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: nanoid(),
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInput({
                              id: nanoid(),
                              inputType: 'codeEditor',
                              propertyName: 'style',
                              label: 'Style',
                              description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                            })
                            .toJson()
                          ]
                        }
                      })
                      .toJson(),
                  ]
                })
                .toJson()
            ]
          },
          {
            key: 'security',
            title: 'Security',
            id: securityId,
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: nanoid(),
                inputType: 'permissions',
                propertyName: 'permissions',
                label: 'Permissions',
                jsSetting: true,
                size: 'small',
                parentId: securityId,
                permissions: data.permissions,
                tooltip: "Enter a list of permissions that should be associated with this component"
              })
              .toJson()
            ]
          }
        ]
      })
      .toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  };
};