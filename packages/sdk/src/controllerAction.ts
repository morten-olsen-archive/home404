export default (controller: string, action: any) => ({
  type: '@@DEVICE/ACTION',
  meta: {
    owner: controller,
  },
  payload: action,
});