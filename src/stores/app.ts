import { defineStore } from "pinia";
export default defineStore("appStore", {
  state: () => {
    return {
      AppData: {
        size: "default",
        labelPosition: "left",
        labelWidth: 0,
        formName: "formSetting",
        RefFormName: "formRef",
        rulesName: "rules",
        AppList: [],
      },
      currentComponent: {
        type: "JInput",
        name: "输入框",
        icon: "",
        componentContent: {
          InputType: "text",
          variateName: "",
          defaultValue: "",
          width: "",
          size: "",
          label: "输入框",
          labelWidth: 0,
          labelPosition: "left",
          placeholder: "请输入",
          prop: "",
        },
      },
      templateList: [
        {
          tempName: "模板一",
          tempInfo: {
            size: "default",
            labelPosition: "left",
            labelWidth: 80,
            formName: "formSetting",
            RefFormName: "formRef",
            rulesName: "rules",
            AppList: [
              {
                type: "JInput",
                name: "输入框",
                icon: "",
                componentContent: {
                  InputType: "text",
                  variateName: "userName",
                  defaultValue: "",
                  width: "",
                  size: "",
                  label: "姓名",
                  labelWidth: 0,
                  labelPosition: "left",
                  placeholder: "请输入姓名",
                  prop: "",
                  isRequired: false,
                  isDisabled: false,
                  verifyMsg: "",
                  customVerify: "",
                },
                uid: 1717484201436,
              },
              {
                type: "JInput",
                name: "输入框",
                icon: "",
                componentContent: {
                  InputType: "text",
                  variateName: "phone",
                  defaultValue: "",
                  width: "",
                  size: "",
                  label: "手机号",
                  labelWidth: 0,
                  labelPosition: "left",
                  placeholder: "请输入手机号",
                  prop: "",
                  isRequired: false,
                  isDisabled: false,
                  verifyMsg: "",
                  customVerify: "",
                },
                uid: 1717484244821,
              },
              {
                type: "JRadio",
                name: "单选框",
                icon: "",
                componentContent: {
                  variateName: "sex",
                  defaultValue: "",
                  width: "",
                  size: "",
                  label: "性别",
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
                      label: "男",
                      value: 1,
                    },
                    {
                      label: "女",
                      value: 2,
                    },
                  ],
                },
                uid: 1717484211133,
              },
              {
                type: "JSelect",
                name: "下拉选项",
                icon: "",
                componentContent: {
                  variateName: "jobState",
                  defaultValue: [],
                  width: "",
                  size: "",
                  label: "在职情况",
                  labelWidth: 0,
                  labelPosition: "left",
                  placeholder: "请选择",
                  prop: "",
                  isRequired: false,
                  isDisabled: false,
                  verifyMsg: "",
                  customVerify: "",
                  options: [
                    {
                      label: "在职",
                      value: 1,
                    },
                    {
                      label: "离职",
                      value: 2,
                    },
                  ],
                },
                uid: 1717484215236,
              },
              {
                type: "JCheckBox",
                name: "多选框",
                icon: "",
                componentContent: {
                  variateName: "interest",
                  defaultValue: [],
                  width: "",
                  size: "",
                  label: "兴趣爱好",
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
                      label: "乒乓球",
                      value: 1,
                    },
                    {
                      label: "足球",
                      value: 2,
                    },
                  ],
                },
                uid: 1717484212225,
              },
              {
                type: "JInput",
                name: "文本域",
                icon: "",
                componentContent: {
                  InputType: "textarea",
                  variateName: "userInfo",
                  defaultValue: "",
                  width: "",
                  size: "",
                  label: "个人简介",
                  labelWidth: 0,
                  labelPosition: "left",
                  placeholder: "请输入",
                  prop: "",
                  isRequired: false,
                  isDisabled: false,
                  verifyMsg: "",
                  customVerify: "",
                },
                uid: 1717484209492,
              },
            ],
          },
        },
      ],
    };
  },
  getters: {},
  actions: {
    setAppData(item){
      this.AppData = item.tempInfo;
    },
    setCurrentComponent(uid) {
      this.currentComponent = this.AppData.AppList.find((e) => e.uid == uid);
    },
    delCurrentComponent() {},
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     { storage: localStorage }, // userInfo localstorage存储
  //   ],
  // },
});
