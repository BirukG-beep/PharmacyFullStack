   import { Select  } from 'antd';
   const {Option} = Select;
export const RenderSoldInSelect = ({ soldInOption, setSoldInOption, medicine }) => {

  return (
    <Select
      value={soldInOption}
      onChange={(value) => setSoldInOption(value)}
      style={{ textAlign: "center" }}
    >
      <Option value="pk">pk</Option>

      {medicine?.soldIn === 'strip' && (
        <Option value="strip">Strip</Option>
      )}

      {medicine?.soldIn === 'tablet' && (
        <>
          <Option value="strip">Strip</Option>
          <Option value="tablet">Tablet</Option>
        </>
      )}
    </Select>
  );
};
        
