import {
  UseFormReturn,
  Path,
  FieldValues,
  Controller,
  RegisterOptions,
} from 'react-hook-form';
import Select, { Props as ReactSelectProps } from 'react-select';

type SelectProps<T extends FieldValues> = {
  control: UseFormReturn<T>['control'];
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  isInvalid?: boolean;
} & ReactSelectProps;

const FormSelect = <T extends FieldValues>(props: SelectProps<T>) => {
  const { name, control, rules, isInvalid = false, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Select
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 5,
              padding: 0,
            }),
            container: () => ({
              padding: 0,
            }),
            control: (base) => ({
              ...base,
              borderColor: isInvalid ? '#E53E3E' : 'auto',
              boxShadow: isInvalid ? '0 0 0 1px #E53E3E' : 'auto',
            }),
            option: (base) => ({
              background: 'white',
              color: 'black',
            }),
            indicatorSeparator: (base) => ({ ...base, display: 'none' }),
            menuList: (base) => ({
              height: 'auto',
              padding: 0,
              backgroundColor: 'white',
            }),
          }}
          {...rest}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default FormSelect;
