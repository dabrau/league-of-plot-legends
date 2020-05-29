import React from 'react';
import Legend from '../ColorScaleLegend';

export default {
  title: 'Color Scale',
  component: Legend,
};


export const Default = () => <Legend />;

export const WithTitle = () => <Legend title='Titled Color Scale' />;
