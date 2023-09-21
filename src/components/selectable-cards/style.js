import styled from "styled-components";

export const StyledSelectableCard = styled.div`
  .card {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background: #fff;
    margin: 20px 10px;
    cursor: pointer;
  }

  .card:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .card .selectable {
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 4px solid transparent;
  }

  .card .selectable .check {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 20px;
    height: 20px;
  }

  .card .selectable .check:before {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    content: "";
    border: 20px solid;
    border-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
  }

  .card .selectable .check .checkmark {
    display: block;
    font: 20px sans-serif;
    line-height: 20px;
    text-align: center;
    color: transparent;
  }

  .card .selectable.selected {
    border-color: #44aadd;
  }

  .card .selectable.selected .check:before {
    border-color: #44aadd #44aadd rgba(0, 0, 255, 0) rgba(255, 0, 0, 0);
  }

  .card .selectable.selected .check .checkmark {
    color: #fff;
  }

  .content .title,
  .content .description {
    margin: 0;
    padding: 4px;
  }

  .content {
    padding: 24px;
  }

  .column > .title {
    text-align: center;
    float: left;
    width: 50%;
  }

  button.card:focus {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;
