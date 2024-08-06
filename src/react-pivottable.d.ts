declare module 'react-pivottable/PivotTableUI' {
    import * as React from 'react';
  
    interface PivotTableUIProps {
      data: any[]; // Adjust type based on your data structure
      onChange?: (state: any) => void; // Optionally handle changes
      [key: string]: any; // Allow additional props
    }
  
    const PivotTableUI: React.FC<PivotTableUIProps>;
  
    export default PivotTableUI;
  }
  