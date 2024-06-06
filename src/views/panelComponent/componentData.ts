const componetData: componetDataType[] = [
  {
    title: "基础组件",
    componentList: [
      {
        type: "JInput",
        name: "输入框",
        icon: "",
        componentContent: {
          InputType: "text",
          slotName: "", //具名插槽
          slotContent: "", //插槽内容
          suffixIcon: "", //前缀图标
          prefixIcon: "", //后缀图标
          maxLength: "", //最大长度
          minLength: "", //最小长度
          showWordLimit: false, //显示输入字符长度
          clearable: false, //是否清空
          showPassword: false,
          resize: "horizontal", //'none' | 'both' | 'horizontal' | 'vertical'
          rows: 4,
          variateName: "",
          defaultValue: "",
          width: "",
          size: "",
          label: "输入框",
          labelWidth: 0,
          labelPosition: "left",
          placeholder: "请输入",
          prop: "",
          isRequired: false,
          isDisabled: false,
          verifyMsg: "",
          isCustomVerify: true,
          customVerify: "",
        },
      },
      {
        type: "JRadio",
        name: "单选框",
        icon: "",
        componentContent: {
          radioType:"radio",
          variateName: "",
          defaultValue: "",
          width: "",
          size: "",
          label: "单选框",
          labelWidth: 0,
          labelPosition: "left",
          border:false,
          textColor:"#ffffff",
          fill:"#409EFF",
          prop: "",
          isRequired: false,
          isDisabled: false,
          verifyMsg: "",
          isCustomVerify: true,
          customVerify: "",
          options: [
            {
              label: "选项一",
              value: 1,
            },
            {
              label: "选项二",
              value: 2,
            },
          ],
        },
      },
      {
        type: "JCheckBox",
        name: "多选框",
        icon: "",
        componentContent: {
          variateName: "",
          defaultValue: [],
          width: "",
          size: "",
          label: "多选框",
          labelWidth: 0,
          labelPosition: "left",
          placeholder: "请输入",
          prop: "",
          isRequired: false,
          isDisabled: false,
          verifyMsg: "",
          customVerify: "",
          options: [
            {
              label: "选项一",
              value: 1,
            },
            {
              label: "选项二",
              value: 2,
            },
          ],
        },
      },
      {
        type: "JSelect",
        name: "下拉选项",
        icon: "",
        componentContent: {
          variateName: "",
          defaultValue: "",
          width: "",
          size: "",
          label: "下拉选项",
          labelWidth: 0,
          labelPosition: "left",
          placeholder: "请输入",
          prop: "",
          isRequired: false,
          isDisabled: false,
          verifyMsg: "",
          customVerify: "",
          options: [
            {
              label: "选项一",
              value: 1,
            },
            {
              label: "选项二",
              value: 2,
            },
          ],
        },
      },
      // {
      //   type: "ElDate",
      //   name: "时间选择器",
      //   icon: "",
      //   componentContent: {
      //     variateName: "",
      //     defaultValue: "",
      //     width: "",
      //     size: "default",
      //     label: "输入框",
      //     labelWidth: "auto",
      //     placeholder: "请输入",
      //     prop: "",
      //   },
      // },
    ],
  },
];
export default componetData;
