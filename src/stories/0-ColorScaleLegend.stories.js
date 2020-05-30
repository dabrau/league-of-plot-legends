import React from 'react';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import Legend from '../ColorScaleLegend';

export default {
  title: 'Color Scale',
  component: Legend,
  decorators: [withKnobs]
};


export const Default = () => (
  <Legend
    label={text('label', 'Your Label Here')}
    tickSize={number('tickSize', 6)}
    width={number('width', 320)}
    height={number('height', 44)}
  />
);
