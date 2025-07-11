import React from 'react';
import RichTextEditor from '@/components/richTextEditor';
import settingsFormJson from './settingsForm.json';
import { ConfigurableFormItem } from '@/components';
import { EditOutlined } from '@ant-design/icons';
import { FormMarkup } from '@/providers/form/models';
import { getStyle } from '@/providers/form/utils';
import { IJoditEditorProps } from '@/components/richTextEditor/joditEditor';
import { IRichTextEditorProps } from './interfaces';
import { IToolboxComponent } from '@/interfaces/formDesigner';
import {
  migrateCustomFunctions,
  migratePropertyName,
  migrateReadOnly,
} from '@/designer-components/_common-migrations/migrateSettings';
import { useDeepCompareMemoKeepReference } from '@/hooks';
import { useForm, useFormData } from '@/providers';
import { validateConfigurableComponentSettings } from '@/formDesignerUtils';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { getSettings } from './formSettings';
import { migratePrevStyles } from '../_common-migrations/migrateStyles';
import { defaultStyles } from './utils';

const settingsForm = settingsFormJson as FormMarkup;

type PartialRichTextEditorConfig = Partial<IJoditEditorProps['config']>;

const RichTextEditorComponent: IToolboxComponent<IRichTextEditorProps> = {
  type: 'richTextEditor',
  name: 'Rich Text Editor',
  icon: <EditOutlined />,
  isInput: true,
  isOutput: true,
  Factory: ({ model }) => {
    const { data: formData } = useFormData();
    const { allStyles } = model;
    const { width, height, minWidth, minHeight, maxWidth, maxHeight } = allStyles?.dimensionsStyles;

        const { formMode } = useForm();
    

    const config = useDeepCompareMemoKeepReference<PartialRichTextEditorConfig>(() => {
      const typedConfig: PartialRichTextEditorConfig = {
        toolbar: model?.toolbar,
        preset: model?.preset,
        textIcons: model?.textIcons,
        toolbarButtonSize: model?.toolbarButtonSize,
        theme: typeof model?.theme === 'string' ? model?.theme : 'default',
        iframe: model?.iframe,
        direction: model?.direction,
        disablePlugins: [...(model?.disablePlugins || []), 'spellcheck'].join(','),
        ...(!model.autoHeight && { height, minHeight, maxHeight }),
        ...(!model.autoWidth && { width, minWidth, maxWidth }),
        placeholder: model?.placeholder ?? '',
        readonly: model?.readOnly,
        style: getStyle(model?.style, formData),
        defaultActionOnPaste: 'insert_as_html',
        enter: model?.enter || 'br',
        editHTMLDocumentMode: false,
        enterBlock: 'div',
        colorPickerDefaultTab: 'color',
        allowResizeX: model?.allowResizeX && !model?.autoWidth,
        allowResizeY: model?.allowResizeY && !model?.autoHeight,
        askBeforePasteHTML: model?.askBeforePasteHTML,
        askBeforePasteFromWord: model?.askBeforePasteFromWord,
        autofocus: formMode === 'designer' ? false : model?.autofocus,
        showCharsCounter: model?.showCharsCounter,
        showWordsCounter: model?.showWordsCounter,
      };
      return typedConfig;
    }, [model, model.readOnly]);

    const rerenderKey = `${model?.placeholder || ''}-${model?.placeholder || false}`;

    return (
      <ConfigurableFormItem model={model} key={rerenderKey}>
        {(value, onChange) => <RichTextEditor config={config} value={value} onChange={onChange} />}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: (data) => getSettings(data),
  validateSettings: (model) => validateConfigurableComponentSettings(settingsForm, model),
  initModel: (model) => ({
    ...model,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    minHeight: 200,
    minWidth: 200,
    toolbar: true,
    useSearch: true,
    autoHeight: true,
    autoWidth: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    disablePlugins: null,
  }),
  migrator: (m) =>
    m
      .add<IRichTextEditorProps>(0, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
      .add<IRichTextEditorProps>(1, (prev) => migrateReadOnly(prev))
      .add<IRichTextEditorProps>(2, (prev) => ({ ...migrateFormApi.eventsAndProperties(prev) }))
      .add<IRichTextEditorProps>(3, (prev) => {
        const styles = {
          style: prev.style,
          theme: prev.theme,
          autoHeight: prev.autoHeight ?? true,
          autoWidth: prev.autoWidth ?? true,
        };
        const resize = {
          allowResizeX: true,
          allowResizeY: true,
        };
        return { ...prev, desktop: { ...styles }, tablet: { ...styles }, mobile: { ...styles }, ...resize };
      })
      .add<IRichTextEditorProps>(6, (prev) => ({ ...migratePrevStyles(prev, defaultStyles()) })),

};

export default RichTextEditorComponent;
