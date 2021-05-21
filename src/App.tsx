import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
	const [students, setStudents] = useState([]);
	const [studentName, setStudentName] = useState("");
	const [rollNo, setRollNo] = useState(0);
	const [marks, setMarks] = useState(0);
	const [city, setCity] = useState("");

	useEffect(() => {
		axios.get("http://localhost:5000/students").then((res) => {
			setStudents(res.data.data);
		});
	});

	function postStudentData() {
		const student = {
			name: studentName,
			rollNo: rollNo,
			marks: marks,
			city: city,
		};
		axios
			.post("http://localhost:5000/student", student)
			.then((res) => {
				alert("Student created");
			})
			.catch((error) => {
				alert("Error occurred");
			});

		return null;
	}

	return (
		<div style={{ margin: "50px" }}>
			<h1>Enter student data:</h1>
			<br />
			<form onSubmit={postStudentData}>
				<div>
					<label>Name</label>&nbsp;
					<input
						type="text"
						value={studentName}
						onChange={(event) => setStudentName(event.target.value)}
					></input>
				</div>
				<br />
				<div>
					<label>Roll No.</label>&nbsp;
					<input
						type="number"
						value={rollNo}
						onChange={(event) => setRollNo(parseInt(event.target.value))}
					></input>
				</div>
				<br />
				<div>
					<label>Marks</label>&nbsp;
					<input
						type="number"
						value={marks}
						onChange={(event) => setMarks(parseInt(event.target.value))}
					></input>
				</div>
				<br />
				<div>
					<label>City</label>&nbsp;
					<select
						value={city}
						onChange={(event) => setCity(event.target.value)}
					>
						<option value="">-- Select --</option>
						<option value="bhavnagar">Bhavnagar</option>
						<option value="junagadh">Junagadh</option>
					</select>
				</div>
				<br />
				<button type="submit">Submit</button>
			</form>
			<br />
			<br />
			<h1>Students Data</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Roll No.</th>
						<th>Marks</th>
						<th>City</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student: any, index) => {
						return (
							<tr key={index}>
								<td>{student.name}</td>
								<td>{student.rollNo}</td>
								<td>{student.marks}</td>
								<td>{student.city}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
