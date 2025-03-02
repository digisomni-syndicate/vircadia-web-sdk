//
//  BulkAvatarData.unit,.test.js
//
//  Created by David Rowe on 9 Nov 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

import BulkAvatarData from "../../../../src/domain/networking/packets/BulkAvatarData";


describe("BulkAvatarData - unit tests", () => {

    /* eslint-disable @typescript-eslint/no-magic-numbers */

    test("Can read a single-avatar BulkAvatarData message", () => {
        // eslint-disable-next-line max-len
        const RECEIVED_MESSAGE = "000000000b360000000000000000000000000000000000002545b3509e064035a9f60708bb44adb91130c2e3e7bf89aa7a3f3e9c06413469e6c5836ad33f9f5ff9c6451cfbffffffffffff1fbefcc8203b644812c08742373805c01642884830becc39fa3d61c3693946c96401593814c96401593814c2f0c61b4169c42ec45d4084c2f9c2a43f710e27e87918c2478d04f13a92430114aa3a6b435c0d12421736c00e2f51f92fd810245d862c5114c369a9236f0f5a633238a80da24daa2fc00fbf5b432b34142d67ff26e6119a64fb3c510d3f433836450ea84ff330de0f19542032a10f9a555026981402416738c1198c43034b5914403c2c65cd15a34b953b420d394a49317d0e11544a2eb31296633f2e2e125062e516fc6e7c15a4379a7783397f3c6d6bd137103fcb7bc33cfe4df5799f4c2555f476d657155a8e719e630362f5760d5baf4ba87a60480955e5775154bd5b70721d61485f87743c5dd6470c7b1f3dec4e5e793a49f5541678454da1527077e94f035a4d72e039cf4a416e9a3a9239e5751a384820f974764b4548c27aff44f0539179434dd8579d743b5cbd581e74745c54bf48c2ba3f0fc0acbc8e3ee8bff5bca73eedbff5bca73eedc0acbc8e3ee80400000000000000001714ca421a040040520045030000000000000000fbffffffffffffff1f";
        const MESSAGE_START = 24;

        const arrayBuffer = new ArrayBuffer(RECEIVED_MESSAGE.length / 2);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0, length = arrayBuffer.byteLength; i < length; i++) {
            uint8Array[i] = Number.parseInt(RECEIVED_MESSAGE.substr(i * 2, 2), 16);
        }
        const dataView = new DataView(arrayBuffer, MESSAGE_START);

        const bulkAvatarDetails = BulkAvatarData.read(dataView);
        expect(bulkAvatarDetails).toHaveLength(1);

        const bulkAvatarDetail = bulkAvatarDetails[0];
        expect(bulkAvatarDetail.sessionUUID.stringify()).toBe("2545b350-9e06-4035-a9f6-0708bb44adb9");
        expect(bulkAvatarDetail.globalPosition.x).toBeCloseTo(-1.81164, 3);
        expect(bulkAvatarDetail.globalPosition.y).toBeCloseTo(0.979165, 3);
        expect(bulkAvatarDetail.globalPosition.z).toBeCloseTo(8.41315, 3);
    });

    test("Can read a dual-avatar BulkAvatarData message", () => {
        // eslint-disable-next-line max-len
        const RECEIVED_MESSAGE = "000000000b360000000000000000000000000000000000008e3751e4adc942ada25d9091c1a531861130ec4a90c0aa49793f5d63ad408c8b96bf41c9d33f229d5a41451ce7ffffffffffff1fbffdbf5c3f4c3f55b93e42e73addc4d342df3f76bcfb38a04eb3c46b39d9501ca4593b79c246bf8c3f76c43ec0673f90c33ec1413fc4162eecdb16410085c715390c3d820c6a325a3e2606773e5e38ac08164ee02d650a735c0e233b10366b3b0bea9b94641d368a082e4c892deb0b785b1d268f0e6e643722820c2060d23d98064645ca36a3078d52363511085655bf36b608e257192ae01a0339b3287b1e443b0734ec1e3342305275210e4dc538d506ff499d2fbf0a3a5aac268f0e0d663126190dc165cd19de7041133736467b863b533eda772c34c73ef06e543b7c3c066f114fec44946f275d094b116c246c7d540271f565d740396d5850a446f26c205f354d2d68f46d8651896beb6aab3ba06f01435044566e37592946d16cf960fb45116c26621450d05e5d426657cd60c240084d0a6073444c2f2e5ceb4f553f916e2d4bef465d6cb45f094d906ac76aff4e156b1d6aa9be5bc334416ec259c47f4187bfe4cdeb40dfbfe1cd7340e6c259c47f418704000000000000000055bac94217040040c6ff45030000000000000000fbffffffffffffff1f5ea4674e121e47dd9016bcefecc9f31211308cf892bf7e2f7d3f61b65b41276f8dc03e14c73f0897ae4045000020000000f000002dc406ad57f67c20c89544fc7aedc0913b2c78c9b97634da78eebadc3327040000000000000000366ec94262ff0040c6ff45030000000000000000fbffffffffffffff1f";
        const MESSAGE_START = 24;

        const arrayBuffer = new ArrayBuffer(RECEIVED_MESSAGE.length / 2);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0, length = arrayBuffer.byteLength; i < length; i++) {
            uint8Array[i] = Number.parseInt(RECEIVED_MESSAGE.substr(i * 2, 2), 16);
        }
        const dataView = new DataView(arrayBuffer, MESSAGE_START);

        const bulkAvatarDetails = BulkAvatarData.read(dataView);
        expect(bulkAvatarDetails).toHaveLength(2);

        let bulkAvatarDetail = bulkAvatarDetails[0];
        expect(bulkAvatarDetail.sessionUUID.stringify()).toBe("8e3751e4-adc9-42ad-a25d-9091c1a53186");
        expect(bulkAvatarDetail.globalPosition.x).toBeCloseTo(-4.50915, 3);
        expect(bulkAvatarDetail.globalPosition.y).toBeCloseTo(0.97378, 3);
        expect(bulkAvatarDetail.globalPosition.z).toBeCloseTo(5.41838, 3);

        bulkAvatarDetail = bulkAvatarDetails[1];
        expect(bulkAvatarDetail.sessionUUID.stringify()).toBe("5ea4674e-121e-47dd-9016-bcefecc9f312");
        expect(bulkAvatarDetail.globalPosition.x).toBeCloseTo(-1.14821, 3);
        expect(bulkAvatarDetail.globalPosition.y).toBeCloseTo(0.989006, 3);
        expect(bulkAvatarDetail.globalPosition.z).toBeCloseTo(13.732, 3);
    });

    test("Can read a BulkAvatarData message that has joint data", () => {
        // eslint-disable-next-line max-len
        const RECEIVED_MESSAGE = "41571a4d7dd34fa1bf57922549e7b4b1117030e75ac0ffec9cc2ec9e10c0fc69cc46c4329cc2590f9a46b000000000000080808000300260000000000000000000ef45b69b6526ed93ae3767bcc90294c46b3ef03ab60e6369ea57ac2b6a21d0a58e796915ca8793c36a4fcc5c8d7269fd0c0000000000000000000000000000000000000000000dff213f1401ff3f34e71401004034e70000000000000000000000000000803f0000000000000000000000000000000000000000000000000000803f000000000000000000000000ee43b5434ac9b93f52531ec49c4a333f951956be8222293fa53a2f3eb0f3070000000000000000000000000000000000000000f3ffffffffffffffffffffffffffffffffffffffffff";
        const MESSAGE_START = 0;

        const arrayBuffer = new ArrayBuffer(RECEIVED_MESSAGE.length / 2);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0, length = arrayBuffer.byteLength; i < length; i++) {
            uint8Array[i] = Number.parseInt(RECEIVED_MESSAGE.substr(i * 2, 2), 16);
        }
        const dataView = new DataView(arrayBuffer, MESSAGE_START);

        const bulkAvatarDetails = BulkAvatarData.read(dataView);
        expect(bulkAvatarDetails).toHaveLength(1);

        const bulkAvatarDetail = bulkAvatarDetails[0];
        expect(bulkAvatarDetail.sessionUUID.stringify()).toBe("41571a4d-7dd3-4fa1-bf57-922549e7b4b1");
    });

    test("Can read a BulkAvatarData message that has orientation data", () => {
        // eslint-disable-next-line max-len
        const RECEIVED_MESSAGE = "000000000b36000000000000000000000000000000000000ba351668ba234dd9b45356207632381615304181d2c0948c823faf3ee140bfffb7c43fff531982c44eabd23fbdd1ffc62a00feffffff03c365baed40983b35a6e13c5a5234c11547554a039f433efdc91601023af5c91601023af53aaec23745863526eb48429531b6caae3bec30fba57c425130fba57c4251bc9bc5863effbe10c55c3e9cbe7fc6ca3e1d157af1e320550d45d9e23e570394c9ee335a023ac4dc2c2c37b100e435a2225505d44d9118160be05a1f18160be05a1f15246c6c16b939c86d222c6055ab642c23a85fd959431e80661353a928f768ef461f46ba67fe3ec555d467fe3ec555d4bea1c5fb3df0c219c2183f9ec219c2183f9e00020200000059c4c5422c0000405efe00004f1b00002aff0100000000fffdfdffff03";
        const MESSAGE_START = 24;

        const arrayBuffer = new ArrayBuffer(RECEIVED_MESSAGE.length / 2);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0, length = arrayBuffer.byteLength; i < length; i++) {
            uint8Array[i] = Number.parseInt(RECEIVED_MESSAGE.substr(i * 2, 2), 16);
        }
        const dataView = new DataView(arrayBuffer, MESSAGE_START);

        const bulkAvatarDetails = BulkAvatarData.read(dataView);
        expect(bulkAvatarDetails).toHaveLength(1);

        const bulkAvatarDetail = bulkAvatarDetails[0];
        expect(bulkAvatarDetail.sessionUUID.stringify()).toBe("ba351668-ba23-4dd9-b453-562076323816");
        expect(bulkAvatarDetail.globalPosition.x).toBeCloseTo(-6.57828, 3);
        expect(bulkAvatarDetail.globalPosition.y).toBeCloseTo(1.01992, 3);
        expect(bulkAvatarDetail.globalPosition.z).toBeCloseTo(7.03890, 3);

        expect(bulkAvatarDetail.localOrientation.x).toBeCloseTo(-0.00002157, 3);
        expect(bulkAvatarDetail.localOrientation.y).toBeCloseTo(-0.0909159, 3);
        expect(bulkAvatarDetail.localOrientation.z).toBeCloseTo(-0.00002157, 3);
        expect(bulkAvatarDetail.localOrientation.w).toBeCloseTo(-0.995859, 3);
    });

    /* eslint-enable @typescript-eslint/no-magic-numbers */

});
