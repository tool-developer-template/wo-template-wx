// 项目创建完成后输出信息
exports.run ={
  "yarn test":"Start to test the project"
};
// 项目创建过程中的prompts
// 参考:https://github.com/SBoudrias/Inquirer.js/blob/master/README.md
exports.prompts = {
  "name": {
      "message": "What's the project name?",
      "default": "`${this.name}`"
  },
  "description": {
      "name": "description",
      "message": "What's your project description?"
  },
  "appid":{
    "message":"What's your miniprogram appid?",
    "default":""
  }
}