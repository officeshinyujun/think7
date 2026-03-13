'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { User, Camera, ChevronLeft, Eye, EyeOff, AlertTriangle, X } from "lucide-react";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { https } from "@/services/https";
import { useState } from "react";

export default function AccountSettings() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [deleteEmailInput, setDeleteEmailInput] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const handleDeleteReports = async () => {
        if (!user) return;
        setDeleteLoading(true);
        setDeleteError('');
        try {
            await https.report.deleteAll(user.id);
            setShowDeleteReportModal(false);
            alert('모든 리포트 기록이 삭제되었습니다.');
        } catch (err: any) {
            setDeleteError(err?.response?.data?.message || '삭제에 실패했습니다.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        if (deleteEmailInput !== user.email) {
            setDeleteError('이메일이 일치하지 않습니다.');
            return;
        }
        setDeleteLoading(true);
        setDeleteError('');
        try {
            await https.auth.deleteAccount(user.id);
            logout();
            router.push('/landing');
        } catch (err: any) {
            setDeleteError(err?.response?.data?.message || '계정 삭제에 실패했습니다.');
            setDeleteLoading(false);
        }
    };

    const isGoogleUser = user?.auth_provider === 'GOOGLE';

    const handlePasswordSubmit = async () => {
        setError('');
        setSuccess('');

        if (isGoogleUser) {
            if (!newPassword || !confirmPassword) {
                setError('모든 필드를 입력해주세요.');
                return;
            }
        } else {
            if (!currentPassword || !newPassword || !confirmPassword) {
                setError('모든 필드를 입력해주세요.');
                return;
            }
        }
        if (newPassword.length < 6) {
            setError('새 비밀번호는 6자 이상이어야 합니다.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!user) return;

        setLoading(true);
        try {
            if (isGoogleUser) {
                await https.auth.setPassword(user.id, newPassword);
                setSuccess('비밀번호가 설정되었습니다. 이제 이메일로도 로그인할 수 있습니다.');
            } else {
                await https.auth.changePassword(user.id, currentPassword, newPassword);
                setSuccess('비밀번호가 변경되었습니다.');
            }
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                setShowPasswordForm(false);
                setSuccess('');
            }, 2500);
        } catch (err: any) {
            const msg = err?.response?.data?.message || '비밀번호 변경에 실패했습니다.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={24} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="var(--text-primary)" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">계정 설정</Typo.LG>
                    </HStack>

                    <VStack fullWidth align="center" gap={24} className={s.section}>
                        <div className={s.avatar}>
                            <User size={40} color="#8B847F" />
                            <div className={s.editIcon}>
                                <Camera size={14} color="white" />
                            </div>
                        </div>

                        <VStack fullWidth gap={16}>
                            <VStack fullWidth gap={8} className={s.inputGroup}>
                                <Typo.SM color="secondary" fontWeight="medium">이메일</Typo.SM>
                                <input className={s.input} defaultValue={user?.email || ''} disabled />
                            </VStack>

                            {isGoogleUser && (
                                <HStack gap={6} align="center" style={{padding: '8px 12px', backgroundColor: 'rgba(66,133,244,0.08)', borderRadius: '8px'}}>
                                    <Typo.XS color="secondary" fontWeight="medium">🔗 Google 계정으로 연결됨</Typo.XS>
                                </HStack>
                            )}

                            {!showPasswordForm ? (
                                <Button
                                    onClick={() => setShowPasswordForm(true)}
                                    style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', marginTop: '8px'}}
                                >
                                    <Typo.MD color="primary" fontWeight="semi-bold">
                                        {isGoogleUser ? '비밀번호 설정' : '비밀번호 변경'}
                                    </Typo.MD>
                                </Button>
                            ) : (
                                <VStack fullWidth gap={12} className={s.passwordForm}>
                                    <Typo.MD color="primary" fontWeight="bold">
                                        {isGoogleUser ? '비밀번호 설정' : '비밀번호 변경'}
                                    </Typo.MD>
                                    {isGoogleUser && (
                                        <Typo.XS color="secondary" fontWeight="medium">
                                            비밀번호를 설정하면 이메일+비밀번호로도 로그인할 수 있습니다.
                                        </Typo.XS>
                                    )}

                                    {!isGoogleUser && (
                                        <VStack fullWidth gap={8}>
                                            <Typo.SM color="secondary" fontWeight="medium">현재 비밀번호</Typo.SM>
                                            <div className={s.passwordInputWrapper}>
                                                <input
                                                    className={s.input}
                                                    type={showCurrent ? 'text' : 'password'}
                                                    placeholder="현재 비밀번호"
                                                    value={currentPassword}
                                                    onChange={e => setCurrentPassword(e.target.value)}
                                                />
                                                <button className={s.eyeButton} onClick={() => setShowCurrent(!showCurrent)} type="button">
                                                    {showCurrent ? <EyeOff size={18} color="#8B847F" /> : <Eye size={18} color="#8B847F" />}
                                                </button>
                                            </div>
                                        </VStack>
                                    )}

                                    <VStack fullWidth gap={8}>
                                        <Typo.SM color="secondary" fontWeight="medium">새 비밀번호</Typo.SM>
                                        <div className={s.passwordInputWrapper}>
                                            <input
                                                className={s.input}
                                                type={showNew ? 'text' : 'password'}
                                                placeholder="6자 이상 입력"
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                            />
                                            <button className={s.eyeButton} onClick={() => setShowNew(!showNew)} type="button">
                                                {showNew ? <EyeOff size={18} color="#8B847F" /> : <Eye size={18} color="#8B847F" />}
                                            </button>
                                        </div>
                                    </VStack>

                                    <VStack fullWidth gap={8}>
                                        <Typo.SM color="secondary" fontWeight="medium">새 비밀번호 확인</Typo.SM>
                                        <input
                                            className={s.input}
                                            type="password"
                                            placeholder="새 비밀번호 다시 입력"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                    </VStack>

                                    {error && (
                                        <Typo.SM color="wrong" fontWeight="medium">{error}</Typo.SM>
                                    )}
                                    {success && (
                                        <Typo.SM color="brand" fontWeight="medium">{success}</Typo.SM>
                                    )}

                                    <HStack fullWidth gap={8} style={{ marginTop: 4 }}>
                                        <Button
                                            onClick={() => {
                                                setShowPasswordForm(false);
                                                setError('');
                                                setSuccess('');
                                                setCurrentPassword('');
                                                setNewPassword('');
                                                setConfirmPassword('');
                                            }}
                                            style={{flex: 1, padding: '14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px'}}
                                        >
                                            <Typo.SM color="secondary" fontWeight="bold">취소</Typo.SM>
                                        </Button>
                                        <Button
                                            onClick={handlePasswordSubmit}
                                            style={{flex: 2, padding: '14px', backgroundColor: '#3D7BFF', borderRadius: '12px', opacity: loading ? 0.6 : 1}}
                                        >
                                            <Typo.SM color="inverted" fontWeight="bold">
                                                {loading ? (isGoogleUser ? '설정 중...' : '변경 중...') : (isGoogleUser ? '설정하기' : '변경하기')}
                                            </Typo.SM>
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}
                        </VStack>
                    </VStack>

                    <VStack fullWidth gap={12} className={s.section}>
                        <Typo.MD color="primary" fontWeight="bold">데이터 관리</Typo.MD>
                        
                        <VStack fullWidth gap={12}>
                            <Button
                                onClick={() => { setShowDeleteReportModal(true); setDeleteError(''); }}
                                style={{width: '100%', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', justifyContent: 'flex-start'}}
                            >
                                <Typo.MD color="primary" fontWeight="medium">모든 리포트 기록 삭제</Typo.MD>
                            </Button>
                            
                            <div
                                className={s.deleteButton}
                                onClick={() => { setShowDeleteAccountModal(true); setDeleteError(''); setDeleteEmailInput(''); }}
                            >
                                <Typo.MD color="wrong" fontWeight="bold">계정 삭제</Typo.MD>
                            </div>
                        </VStack>
                    </VStack>
                </VStack>
            </div>

            {/* Delete Reports Modal */}
            {showDeleteReportModal && (
                <div className={s.modalOverlay} onClick={() => setShowDeleteReportModal(false)}>
                    <div className={s.modal} onClick={e => e.stopPropagation()}>
                        <HStack fullWidth justify="between" align="center">
                            <Typo.LG color="primary" fontWeight="bold">리포트 기록 삭제</Typo.LG>
                            <button className={s.closeButton} onClick={() => setShowDeleteReportModal(false)}>
                                <X size={20} color="#8B847F" />
                            </button>
                        </HStack>

                        <VStack fullWidth gap={16} style={{ marginTop: 16 }}>
                            <HStack gap={12} align="center" style={{padding: '12px 16px', backgroundColor: 'rgba(255,59,48,0.06)', borderRadius: '12px'}}>
                                <AlertTriangle size={20} color="#FF3B30" />
                                <Typo.SM color="wrong" fontWeight="medium">이 작업은 되돌릴 수 없습니다.</Typo.SM>
                            </HStack>

                            <Typo.SM color="secondary" fontWeight="medium">
                                모든 리포트 기록이 영구적으로 삭제됩니다. 정말 삭제하시겠습니까?
                            </Typo.SM>

                            {deleteError && (
                                <Typo.SM color="wrong" fontWeight="medium">{deleteError}</Typo.SM>
                            )}

                            <HStack fullWidth gap={8}>
                                <Button
                                    onClick={() => setShowDeleteReportModal(false)}
                                    style={{flex: 1, padding: '14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px'}}
                                >
                                    <Typo.SM color="secondary" fontWeight="bold">취소</Typo.SM>
                                </Button>
                                <Button
                                    onClick={handleDeleteReports}
                                    style={{flex: 2, padding: '14px', backgroundColor: '#FF3B30', borderRadius: '12px', opacity: deleteLoading ? 0.6 : 1}}
                                >
                                    <Typo.SM color="inverted" fontWeight="bold">{deleteLoading ? '삭제 중...' : '삭제하기'}</Typo.SM>
                                </Button>
                            </HStack>
                        </VStack>
                    </div>
                </div>
            )}

            {/* Delete Account Modal */}
            {showDeleteAccountModal && (
                <div className={s.modalOverlay} onClick={() => setShowDeleteAccountModal(false)}>
                    <div className={s.modal} onClick={e => e.stopPropagation()}>
                        <HStack fullWidth justify="between" align="center">
                            <Typo.LG color="primary" fontWeight="bold">계정 삭제</Typo.LG>
                            <button className={s.closeButton} onClick={() => setShowDeleteAccountModal(false)}>
                                <X size={20} color="#8B847F" />
                            </button>
                        </HStack>

                        <VStack fullWidth gap={16} style={{ marginTop: 16 }}>
                            <HStack gap={12} align="center" style={{padding: '12px 16px', backgroundColor: 'rgba(255,59,48,0.06)', borderRadius: '12px'}}>
                                <AlertTriangle size={20} color="#FF3B30" />
                                <Typo.SM color="wrong" fontWeight="medium">이 작업은 되돌릴 수 없습니다.</Typo.SM>
                            </HStack>

                            <Typo.SM color="secondary" fontWeight="medium">
                                계정과 모든 데이터가 영구적으로 삭제됩니다. 확인을 위해 이메일 주소를 입력해주세요.
                            </Typo.SM>

                            <VStack fullWidth gap={6}>
                                <Typo.XS color="secondary" fontWeight="medium">{user?.email}</Typo.XS>
                                <input
                                    className={s.input}
                                    type="text"
                                    placeholder="이메일 입력"
                                    value={deleteEmailInput}
                                    onChange={e => { setDeleteEmailInput(e.target.value); setDeleteError(''); }}
                                />
                            </VStack>

                            {deleteError && (
                                <Typo.SM color="wrong" fontWeight="medium">{deleteError}</Typo.SM>
                            )}

                            <HStack fullWidth gap={8}>
                                <Button
                                    onClick={() => setShowDeleteAccountModal(false)}
                                    style={{flex: 1, padding: '14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px'}}
                                >
                                    <Typo.SM color="secondary" fontWeight="bold">취소</Typo.SM>
                                </Button>
                                <Button
                                    onClick={handleDeleteAccount}
                                    style={{flex: 2, padding: '14px', backgroundColor: deleteEmailInput === user?.email ? '#FF3B30' : '#ccc', borderRadius: '12px', opacity: deleteLoading ? 0.6 : 1}}
                                >
                                    <Typo.SM color="inverted" fontWeight="bold">{deleteLoading ? '삭제 중...' : '계정 삭제'}</Typo.SM>
                                </Button>
                            </HStack>
                        </VStack>
                    </div>
                </div>
            )}
        </div>
    )
}
