import { getList, save } from "@/actions/CoreActions";
import { selectListState } from "@/store/listSlice";
import { AcademicPeriod } from "@/types/academicperiod";
import { Resources } from "@/utils/ApiConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AcademicSubPeriodDropdown from "./AcademicSubPeriodDropdown";
import AcademicYearDropdown from "./AcademicYearDropdown";
import CustomModal, { ModalProps, defaultFormStyle } from "../common/wrapper/CustomModal";
import PageSubtitle from "../common/typography/PageSubtitle";

export default function AcademicPeriodModal(props: ModalProps) {
  const dispatch = useDispatch();

  const {page, rowsPerPage, filters, sort, keyword}: any = useSelector(selectListState);
  const initialValues  = {
    year: '',
    period: '',
    gradingActive: false,
    enrollmentActive: false
  };

  const [newPeriod, setNewPeriod] = useState<AcademicPeriod>(initialValues);
  const formValueChange = (field: string, value: any) => setNewPeriod({...newPeriod, [field]: value});
  
  const handleSubmit = async () => {
    await save(Resources.ACADEMIC_PERIODS, newPeriod, dispatch);
    await getList(
      Resources.ACADEMIC_PERIODS,
      {
      filters: filters, 
      sort: sort, 
      keyword: keyword,
      page: page,
      rowsPerPage: rowsPerPage, 
    }, dispatch);
    onClose();
  }

  const onClose = () => {
    !props.data && setNewPeriod(initialValues);
    props.onClose();
  }

  useEffect(() => {
    if(props.data){
      setNewPeriod(props.data)
    }
  }, [props.data])

  return (
    <CustomModal {...props} onClose={onClose} handleSubmit={handleSubmit}>
        <PageSubtitle>Academic Period Information</PageSubtitle>
        <AcademicYearDropdown value={newPeriod.year} required size='small' style={defaultFormStyle} handler={formValueChange}/>
        <AcademicSubPeriodDropdown value={newPeriod.period} required size='small' style={defaultFormStyle} handler={formValueChange}/>
     </CustomModal>  
  );
}
