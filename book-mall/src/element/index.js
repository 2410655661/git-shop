import {
  Autocomplete,
  Badge,
  Button,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Row
} from 'element-ui';

const element = {
  install: function (Vue) {
    Vue.use(Autocomplete);
    Vue.use(Button);
    Vue.use(Badge);
    Vue.use(Col);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);
    Vue.use(Row);
  }
};

export default element;