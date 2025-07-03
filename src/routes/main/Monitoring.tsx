import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import nodeIcon from '@assets/images/icon-node.svg';
import robotIcon from '@assets/images/icon-robot.svg';
import pinIcon from '@assets/images/pin.svg';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import * as turf from '@turf/turf';

const pathCoordinates: LatLngTuple[] = [
	[36.392378, 127.361459], // 트위니
	[36.392386, 127.359635], // 중소기업청
	[36.394882, 127.356588], // 기계연구원
];
// 커스텀 아이콘 정의
const customIcon = new L.Icon({
	iconUrl: nodeIcon,
	iconSize: [12, 12], // 아이콘 크기
	iconAnchor: [6, 6], // 좌표 기준점 (아래쪽 가운데)
	popupAnchor: [0, -12], // 팝업 위치
});

const customRobotIcon = new L.Icon({
	iconUrl: robotIcon,
	iconSize: [12, 12], // 아이콘 크기
	iconAnchor: [6, 6], // 좌표 기준점 (아래쪽 가운데)
	popupAnchor: [0, -12], // 팝업 위치
});
const customPinIcon = new L.Icon({
	iconUrl: pinIcon,
	iconSize: [24, 24], // 아이콘 크기
	iconAnchor: [12, 30], // 좌표 기준점 (아래쪽 가운데)
	popupAnchor: [0, -24], // 팝업 위치
});

export default function Monitoring() {
	const [currentPosition, setCurrentPosition] = useState<LatLngTuple[]>([]);
	const currentIndexRef = useRef(0);
	const directionRef = useRef<1 | 0>(1);

	useEffect(() => {
		const test = pathCoordinates.map(([lat, lng]) => [lng, lat]);

		// 2. LineString 생성
		const line = turf.lineString(test as number[][]); // turf에서는 위도, 경도 순서로 데이터를 넘겨야 함.

		// 3. 경로 전체 길이 (단위: meters)
		const length = turf.length(line, { units: 'kilometers' });
		console.log('전체 경로 길이(m):', length.toFixed(2));

		// 4. 10m 간격으로 점 찍기
		const sampledPoints: LatLngTuple[] = [];
		for (let dist = 0; dist <= length; dist += 0.01) {
			const point = turf.along(line, dist, { units: 'kilometers' });
			sampledPoints.push(point.geometry.coordinates as LatLngTuple);
		}

		// 5. 결과 출력
		console.log('10m 간격 점들 (경도, 위도):');
		console.table(sampledPoints);
		sampledPoints.forEach((coord, idx) => {
			console.log(`#${idx}: 위도 ${coord[1]}, 경도 ${coord[0]}`);
		});

		const interval = setInterval(() => {
			const index = currentIndexRef.current;
			const [lng, lat] = sampledPoints[index]; // leaflet에서는 경도, 위도 순서로 데이터를 넘겨야 함.

			setCurrentPosition([[lat, lng]]);
			if (directionRef.current === 1) {
				// 순방향

				if (currentIndexRef.current === sampledPoints.length - 1) {
					directionRef.current = 0;
				} else {
					currentIndexRef.current += 1;
				}
			} else {
				if (currentIndexRef.current === 0) {
					directionRef.current = 1;
				} else {
					currentIndexRef.current -= 1;
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<MapContainer
				center={[36.392378, 127.361459]}
				zoom={18}
				style={{ height: '800px', width: '100%' }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={[36.392378, 127.361459]} icon={customPinIcon}>
					<Popup>트위니 본사입니다.</Popup>
				</Marker>

				{/* 경로 Polyline */}
				<Polyline
					positions={pathCoordinates}
					pathOptions={{ color: 'red', weight: 4, opacity: 0.5 }}
				/>

				{/* 각 지점에 마커 */}
				{pathCoordinates.map((position, idx) => (
					<Marker key={idx} position={position} icon={customIcon}>
						<Popup>지점 {idx + 1}</Popup>
					</Marker>
				))}

				{/* 현재 로봇 위치 */}
				{currentPosition[0] && (
					<Marker position={currentPosition[0]} icon={customRobotIcon}>
						<Popup>현재 위치</Popup>
					</Marker>
				)}
			</MapContainer>
		</>
	);
}
