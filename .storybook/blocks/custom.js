import * as React from 'react';

import { useOf, Source } from '@storybook/blocks';

export const DefineUse = ({ }) => {
  const resolvedOf = useOf('meta', ['story', 'meta']);
  const preparedMeta = resolvedOf.preparedMeta;
  let name = preparedMeta.component.name;
  let str = `import {  ${name} } from "@my-plugins/vue-web";`;
  return React.createElement(Source, { code: str });
};