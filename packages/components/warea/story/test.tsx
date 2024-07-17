import { useOf } from '@storybook/blocks';

export default function HelloMessage(props) {
  console.log(props)

 let data=useOf(props.of || 'meta', ['meta'])
 let preparedMeta=data.preparedMeta
 console.log(preparedMeta)
}