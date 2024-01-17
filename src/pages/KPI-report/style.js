import styled from "styled-components";

export const KPIReportComponentStyled = styled.div`
  table th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th + th,
  td + td {
    border-left: 1px solid #ddd;

  }
`;
